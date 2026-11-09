import { Container } from '../components/Container'
import { Reveal } from '../components/Reveal'
import { logos } from '../content'

export function LogoCloud() {
  return (
    <section className="border-y border-line py-10">
      <Container>
        <Reveal>
          <p className="text-center text-[12px] uppercase tracking-[0.18em] text-faint">Built for</p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {logos.map((name) => (
              <span key={name} className="text-[15px] font-medium text-muted">
                {name}
              </span>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
