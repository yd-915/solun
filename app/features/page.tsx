import WelcomerBlog from '@/components/welcomerBlog'
import CTABanner from '@/components/CTABanner'
import FeaturesContent from '@/content/features.mdx'
import Header from '@/components/header'
import Footer from '@/components/footer'

export const metadata = {
    title: 'Solun • How we handle new features',
    description: 'In this article we will explain how we handle new features and how we make sure that they are secure and safe to use.',
}

export default function Features() {

  return (
    <>
    <Header />
    <div className="bg-primary min-h-screen">
      <section>
        <WelcomerBlog title="How we handle new features" />
      </section>
      <section>
        <div className="container mx-auto px-4 md:px-20 py-8 md:py-16 h-full flex items-center justify-center">
            <div className="prose prose-lg prose-invert max-w-4xl">
                <FeaturesContent />
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