import { Hero } from '../components/Hero';
import { TokenList } from '../components/TokenList';

export function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <TokenList />
    </div>
  );
}