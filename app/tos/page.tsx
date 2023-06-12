import WelcomerBlog from '@/components/welcomerBlog'
import CTABanner from '@/components/CTABanner'
import TosContent from '@/content/tos.mdx'
import Header from '@/components/header'
import Footer from '@/components/footer'

export const metadata = {
    title: 'Solun • Terms of Service',
}

export default function Tos() {

  return (
    <>
    <Header />
    <div className="bg-primary min-h-screen">
      <section>
        <WelcomerBlog title="Terms of Service" />
      </section>
      <section>
        <div className="container mx-auto px-4 md:px-20 py-8 md:py-16 h-full flex items-center justify-center">
            <div className="prose prose-lg prose-invert max-w-4xl">
                <TosContent />
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
