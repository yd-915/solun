import WelcomerBlog from '@/components/welcomerBlog'
import CTABanner from '@/components/CTABanner'
import HowMessageContent from '@/content/howMessage.mdx'
import Header from '@/components/header'
import Footer from '@/components/footer'

export const metadata = {
    title: 'Solun • How we encrypt your message',
    description: 'In this article we explain how your messages are encrypted at Solun, and how we ensure that your messages are secure and private.'
}

export default function HowMessage() {

  return (
    <>
    <Header />
    <div className="bg-primary min-h-screen">
      <section>
        <WelcomerBlog title="How we encrypt your message" />
      </section>
      <section>
        <div className="container mx-auto px-4 md:px-20 py-8 md:py-16 h-full flex items-center justify-center">
            <div className="prose prose-lg prose-invert max-w-4xl">
                <HowMessageContent />
            </div>
        </div>
      </section>
      <section>
        <CTABanner />
      </section>
    </div>
    <Footer />
    </>
  )
}