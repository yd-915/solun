import WelcomerBlog from '@/components/welcomerBlog'
import CTABanner from '@/components/CTABanner'
import HowFileContent from '@/content/howFile.mdx'

export const metadata = {
    title: 'Solun • How we protect your files',
    description: 'In this article we explain how your files are encrypted at Solun, and how we ensure that your files are secure and private.'
}

export default function HowFile() {

  return (
    <div className="bg-primary min-h-screen">
      <section>
        <WelcomerBlog title="How we protect your files" />
      </section>
      <section>
        <div className="container mx-auto px-4 md:px-20 py-8 md:py-16 h-full flex items-center justify-center">
            <div className="prose prose-lg prose-invert max-w-4xl">
                <HowFileContent />
            </div>
        </div>
      </section>
      <section>
        <CTABanner />
      </section>
    </div>
  )
}