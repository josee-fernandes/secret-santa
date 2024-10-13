import { ThemeToggler } from '@/components/theme-toggler'
import { NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <div className="bg-background">
      <h1 className="text-center text-4xl font-bold text-primary">
        Secret Santa
      </h1>
      <ThemeToggler />
    </div>
  )
}

Home.displayName = 'Home'

export default Home
