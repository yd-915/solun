import Head from 'next/head'
import Welcomer from '@/components/welcomer'
import Services from '@/components/services'

export default function Home() {
  return (
    <div className="bg-primary h-screen">
      <section>
        <Welcomer />
      </section>
      <section>
        <Services />
      </section>
    </div>
  )
}