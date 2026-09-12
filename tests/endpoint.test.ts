import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
test("server endpoint rejects abuse and never reports success without SMTP", () => {
  const script = `
const {NextRequest}=await import('next/server');const {POST}=await import('./src/app/api/contact/route.ts');
const payload={name:'Synthetic Test',mobile:'9876543210',area:'',category:'concern',message:'Synthetic local enquiry only.',website:'',startedAt:Date.now()-5000,locale:'en'};
const call=(data,origin='http://localhost:3000')=>POST(new NextRequest('http://localhost:3000/api/contact',{method:'POST',headers:{origin,'Content-Type':'application/json'},body:JSON.stringify(data)}));
const out=[];out.push((await call(payload,'https://invalid.example')).status);out.push((await call({...payload,mobile:'12'})).status);out.push((await call({...payload,website:'spam'})).status);out.push((await call({...payload,startedAt:Date.now()})).status);out.push((await call(payload)).status);const r=await call(payload);out.push((await r.json()).ok);console.log(JSON.stringify(out));`;
  const result = spawnSync(
    process.execPath,
    [
      "--conditions=react-server",
      "--import",
      "tsx",
      "--input-type=module",
      "-e",
      script,
    ],
    {
      cwd: process.cwd(),
      encoding: "utf8",
      env: {
        ...process.env,
        SMTP_HOST: "",
        SMTP_USER: "",
        SMTP_PASSWORD: "",
        CONTACT_ALLOWED_ORIGINS: "http://localhost:3000",
        RATE_LIMIT_REST_URL: "",
      },
    },
  );
  assert.equal(result.status, 0, result.stderr);
  assert.deepEqual(JSON.parse(result.stdout.trim()), [
    403,
    400,
    400,
    400,
    503,
    false,
  ]);
});
