import Image from "next/image";
import { Locale, pick, name, siteConfig } from "@/content/site";
import { ContactForm } from "@/components/contact-form";
import { wrap } from "@/components/ui";
export function ContactPage({ locale: l }: { locale: Locale }) {
  return (
    <>
      <section className="relative overflow-hidden bg-navy text-white">
        <div className={`${wrap} grid lg:grid-cols-[1.2fr_.8fr]`}>
          <div className="relative z-10 py-14 lg:py-20">
            <p className="eyebrow !text-gold">
              {pick(
                l,
                "जनसंवाद • आपकी सहभागिता",
                "JAN SAMVAD • YOUR PARTICIPATION",
              )}
            </p>
            <h1 className="font-display text-5xl leading-[1.3] sm:text-6xl lg:text-7xl">
              {pick(
                l,
                "आपकी बात, सीधे संवाद तक",
                "Your voice. A direct conversation.",
              )}
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/80">
              {pick(
                l,
                "अपने क्षेत्र की समस्या, सहायता से जुड़ी जरूरत, सुझाव या मुलाकात का अनुरोध साझा करें। यह माध्यम आपकी बात को संदर्भ के साथ समझने और आवश्यक अनुवर्ती संवाद की संभावना बनाने के लिए है।",
                "Share an issue from your area, an assistance enquiry, a suggestion or a request to meet. This channel helps the team understand your message in context and consider whether further conversation is needed.",
              )}
            </p>
          </div>
          <div className="relative h-80 lg:h-auto">
            <Image
              src="/images/hero/smil-f.png"
              alt={name(l)}
              fill
              priority
              sizes="(max-width: 1023px) 100vw, 35vw"
              className="object-contain object-bottom"
            />
          </div>
        </div>
      </section>
      <div id="jan-samvad" className="-scroll-mt-16">
        <ContactForm locale={l} />
      </div>
      <section className="bg-[#e0e7ec]">
        <div className={`${wrap} grid gap-10 py-16 lg:grid-cols-3`}>
          <div>
            <span className="text-xs text-blue">
              01 / {pick(l, "संदर्भ", "CONTEXT")}
            </span>
            <h2 className="mt-4 font-display text-3xl text-navy">
              {pick(l, "स्पष्ट जानकारी उपयोगी है", "Useful context helps")}
            </h2>
            <p className="mt-5 leading-relaxed text-ink/75">
              {pick(
                l,
                "समस्या कहाँ है और किस तरह असर डाल रही है, यह संक्षेप में लिखें। पहले संबंधित विभाग या कार्यालय में बात रखी हो तो उसका सामान्य संदर्भ दें। सुझाव साझा करते समय बताएं कि आप किस सुधार की दिशा देखना चाहते हैं। अनावश्यक व्यक्तिगत जानकारी लिखना जरूरी नहीं है।",
                "Briefly explain where the issue is and how it affects people. If you have already approached a relevant department or office, provide the general context. When sharing a suggestion, describe the improvement you would like to see. You do not need to include unnecessary personal information or private documents to make your concern understandable.",
              )}
            </p>
          </div>
          <div>
            <span className="text-xs text-blue">
              02 / {pick(l, "संपर्क", "FOLLOW-UP")}
            </span>
            <h2 className="mt-4 font-display text-3xl text-navy">
              {pick(l, "आगे के संवाद के लिए", "For a further conversation")}
            </h2>
            <p className="mt-5 leading-relaxed text-ink/75">
              {pick(
                l,
                "ऐसा मोबाइल नंबर दें जिस पर जरूरत पड़ने पर आपसे संपर्क किया जा सके। मुलाकात के अनुरोध में विषय और सुविधाजनक समय की जानकारी लिख सकते हैं। अनुरोध भेजना मुलाकात की पुष्टि नहीं है। हर विषय का उत्तर या समाधान उसकी प्रकृति, उपलब्ध जानकारी और संबंधित प्रक्रिया पर निर्भर हो सकता है।",
                "Provide a mobile number on which you can be contacted if further information is needed. For a meeting request, you may include the subject and a convenient time. Sending a request does not confirm an appointment. Any response or resolution may depend on the nature of the issue, the information available and the process involved.",
              )}
            </p>
          </div>
          <div>
            <span className="text-xs text-blue">
              03 / {pick(l, "माध्यम की भूमिका", "PURPOSE OF THIS CHANNEL")}
            </span>
            <h2 className="mt-4 font-display text-3xl text-navy">
              {pick(
                l,
                "संवाद जो जुड़ाव बनाए",
                "Dialogue That Builds Connection",
              )}
            </h2>
            <p className="mt-5 leading-relaxed text-ink/75">
              {pick(
                l,
                "जनसंवाद का उद्देश्य लोगों की बात को सुनना, उनकी प्राथमिकताओं को समझना और आवश्यक विषयों को सही स्तर तक पहुँचाने की दिशा बनाना है। हर संदेश अपने साथ किसी अनुभव, अपेक्षा या समस्या को लेकर आता है, इसलिए प्रयास यही रहता है कि संवाद सम्मानजनक, स्पष्ट और उपयोगी बना रहे तथा लोगों और सार्वजनिक जिम्मेदारी के बीच भरोसे का संबंध मजबूत हो।",
                "Public dialogue is about listening to people, understanding their priorities, and helping important concerns move in the right direction. Every message carries an experience, expectation, or issue, so the focus remains on keeping communication respectful, clear, and meaningful while strengthening trust between people and public responsibility.",
              )}
            </p>
          </div>
        </div>
      </section>
      {(siteConfig.phone || siteConfig.publicEmail) && (
        <div className={`${wrap} flex flex-wrap gap-6 py-8`}>
          {siteConfig.phone && (
            <a className="min-h-11 underline" href={`tel:${siteConfig.phone}`}>
              {siteConfig.phone}
            </a>
          )}
          {siteConfig.publicEmail && (
            <a
              className="min-h-11 underline"
              href={`mailto:${siteConfig.publicEmail}`}
            >
              {siteConfig.publicEmail}
            </a>
          )}
        </div>
      )}
    </>
  );
}
