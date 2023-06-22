import Header from '@/components/header'
import Footer from '@/components/footer'

import Welcomer from '@/components/welcomer';
import Services from '@/components/services';
import WhySolun from '@/components/whySolun';
import CTABanner from '@/components/CTABanner';

export default function Home() {
  return (
    <>
    <Header />
    <div className="bg-primary min-h-screen">
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
          <CTABanner />
        </section>
    </div>
    <Footer />
    </>
  )
}