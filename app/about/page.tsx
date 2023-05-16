import WelcomerBlog from '@/components/welcomerBlog'
import CTABanner from '@/components/CTABanner'
import AboutContent from '@/content/about.mdx'

export const metadata = {
    title: 'Solun • About',
}

export default function About() {

  return (
    <div className="bg-primary min-h-screen">
      <section>
        <WelcomerBlog title="About Solun" />
      </section>
      <section>
        <div className="container mx-auto px-4 md:px-20 py-8 md:py-16 h-full flex items-center justify-center">
            <div className="prose prose-lg prose-invert max-w-4xl">
                <AboutContent />
            </div>
        </div>
      </section>
      <section>
        <CTABanner />
      </section>
    </div>
  )
}
