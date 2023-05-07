import Welcomer from '@/components/welcomer'
import Services from '@/components/services'
import WhySolun from '@/components/whySolun'
import Testimonials from '@/components/testimonials'
import CTABanner from '@/components/CTABanner'
import Footer from '@/components/footer'

export default function Home() {
  return (
    <div className="bg-primary h-screen">
      <section>
        <Welcomer />
      </section>
      <section>
        <Services />
      </section>
      <section>
        <WhySolun />
      </section>
      <section>
        <Testimonials />
      </section>
      <section>
        <CTABanner />
      </section>
      <Footer />
    </div>
  )
}