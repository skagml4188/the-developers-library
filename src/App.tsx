import { useState } from 'react';
import './index.css';
import { FloatingParticles } from './components/FloatingParticles';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { FilterBar } from './components/FilterBar';
import { BookShelf } from './components/BookShelf';
import { Footer } from './components/Footer';
import portfoliosData from './data/portfolios.json';
import type { Portfolio, TechStack } from './types';

const portfolios = portfoliosData as Portfolio[];

function App() {
  const [selectedStack, setSelectedStack] = useState<TechStack | null>(null);

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #0a0500 0%, #0f0700 30%, #120800 60%, #0a0500 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* 배경 마법 입자 */}
      <FloatingParticles />

      {/* 배경 패턴 오버레이 */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          backgroundImage: `
            radial-gradient(circle at 15% 25%, rgba(139, 69, 19, 0.04) 0%, transparent 50%),
            radial-gradient(circle at 85% 75%, rgba(100, 40, 10, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(60, 20, 5, 0.03) 0%, transparent 70%)
          `,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* 콘텐츠 */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <Header />

        <main>
          {/* 히어로 섹션 */}
          <HeroSection />

          {/* 구분선 */}
          <div
            style={{
              maxWidth: 900,
              margin: '0 auto 0',
              height: 1,
              background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.3), transparent)',
            }}
          />

          {/* 필터 바 */}
          <FilterBar selected={selectedStack} onSelect={setSelectedStack} />

          {/* 책장 */}
          <div style={{ padding: '0 24px 80px' }}>
            <BookShelf portfolios={portfolios} selectedStack={selectedStack} />
          </div>
        </main>

        {/* 푸터 */}
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px' }}>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;
