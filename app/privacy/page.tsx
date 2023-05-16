import WelcomerBlog from '@/components/welcomerBlog'
import CTABanner from '@/components/CTABanner'
import PrivacyContent from '@/content/privacy.mdx'

export const metadata = {
    title: 'Solun • Privacy Policy',
}

export default function Privacy() {

  return (
    <div className="bg-primary min-h-screen">
      <section>
        <WelcomerBlog title="Privacy Policy" />
      </section>
      <section>
        <div className="container mx-auto px-4 md:px-20 py-8 md:py-16 h-full flex items-center justify-center">
            <div className="prose prose-lg prose-invert max-w-4xl">
                <PrivacyContent />
            </div>
        </div>
      </section>
      <section>
        <CTABanner />
      </section>
    </div>
  )
}
