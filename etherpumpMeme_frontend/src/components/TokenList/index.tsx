import { TokenListHeader } from './TokenListHeader';
import { TokenGrid } from './TokenGrid';

export function TokenList() {
  return (
    <section className="py-12 px-4">
      <div className="container mx-auto">
        <TokenListHeader />
        <TokenGrid />
      </div>
    </section>
  );
}