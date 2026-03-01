import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FloatingParticles } from '../components/FloatingParticles';

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // 간단한 모의 인증 (실제 백엔드 연동 전)
    await new Promise((resolve) => setTimeout(resolve, 800));

    const stored = localStorage.getItem('devlibrary_user');
    if (stored) {
      const user = JSON.parse(stored);
      if (user.email === email && user.password === password) {
        sessionStorage.setItem('devlibrary_session', JSON.stringify({ email: user.email, name: user.name }));
        navigate('/');
        return;
      }
    }

    // 데모용: 테스트 계정 허용
    if (email === 'demo@library.dev' && password === 'password123') {
      sessionStorage.setItem('devlibrary_session', JSON.stringify({ email, name: '데모 사용자' }));
      navigate('/');
      return;
    }

    setError('이메일 또는 비밀번호가 올바르지 않습니다.');
    setIsLoading(false);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #0a0500 0%, #0f0700 30%, #120800 60%, #0a0500 100%)',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <FloatingParticles />

      {/* 배경 패턴 */}
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

      {/* 상단 황금 장식선 */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: 1,
          background: 'linear-gradient(90deg, transparent, #d4af37, #f0c040, #d4af37, transparent)',
          zIndex: 10,
        }}
      />

      {/* 로고 */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{ position: 'relative', zIndex: 2, marginBottom: 40, textAlign: 'center' }}
      >
        <Link to="/" style={{ textDecoration: 'none' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, justifyContent: 'center' }}>
            <div
              style={{
                fontSize: '2rem',
                filter: 'drop-shadow(0 0 12px rgba(212,175,55,0.6))',
              }}
            >
              📚
            </div>
            <div>
              <div
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  background: 'linear-gradient(135deg, #f0c040, #d4af37, #c9a84c)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                The Developer's Library
              </div>
              <div
                style={{
                  fontFamily: "'EB Garamond', serif",
                  fontSize: '0.7rem',
                  color: '#c8b08a',
                  letterSpacing: '0.15em',
                  fontStyle: 'italic',
                  textAlign: 'center',
                }}
              >
                개발자의 서재
              </div>
            </div>
          </div>
        </Link>
      </motion.div>

      {/* 로그인 카드 */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        style={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          maxWidth: 420,
          padding: '0 24px',
        }}
      >
        <div
          style={{
            background: 'linear-gradient(135deg, #1e0f00 0%, #120800 60%, #0a0500 100%)',
            border: '1px solid rgba(212,175,55,0.2)',
            borderRadius: 6,
            overflow: 'hidden',
            boxShadow: '0 24px 80px rgba(0,0,0,0.8), 0 0 40px rgba(212,175,55,0.05)',
          }}
        >
          {/* 상단 컬러 바 */}
          <div
            style={{
              height: 3,
              background: 'linear-gradient(90deg, #d4af37, #f0c040, #d4af37)',
            }}
          />

          <div style={{ padding: '36px 32px' }}>
            {/* 타이틀 */}
            <div style={{ textAlign: 'center', marginBottom: 32 }}>
              <div
                style={{
                  fontFamily: "'EB Garamond', serif",
                  fontSize: '0.75rem',
                  color: 'rgba(200,176,138,0.5)',
                  letterSpacing: '0.25em',
                  fontStyle: 'italic',
                  marginBottom: 8,
                }}
              >
                — 서재에 입장하려면 —
              </div>
              <h1
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: '1.6rem',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  background: 'linear-gradient(135deg, #f0c040, #d4af37)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                로그인
              </h1>
            </div>

            {/* 구분선 */}
            <div
              style={{
                height: 1,
                background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.3), transparent)',
                marginBottom: 28,
              }}
            />

            {/* 폼 */}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {/* 이메일 */}
              <div>
                <label
                  style={{
                    display: 'block',
                    fontFamily: "'Cinzel', serif",
                    fontSize: '0.7rem',
                    letterSpacing: '0.15em',
                    color: 'rgba(200,176,138,0.7)',
                    marginBottom: 8,
                  }}
                >
                  이메일
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  style={{
                    width: '100%',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(212,175,55,0.2)',
                    borderRadius: 3,
                    padding: '11px 14px',
                    fontFamily: "'EB Garamond', serif",
                    fontSize: '1rem',
                    color: '#e8d5b0',
                    outline: 'none',
                    transition: 'border-color 0.2s, background 0.2s',
                    boxSizing: 'border-box',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'rgba(212,175,55,0.6)';
                    e.target.style.background = 'rgba(212,175,55,0.05)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(212,175,55,0.2)';
                    e.target.style.background = 'rgba(255,255,255,0.04)';
                  }}
                />
              </div>

              {/* 비밀번호 */}
              <div>
                <label
                  style={{
                    display: 'block',
                    fontFamily: "'Cinzel', serif",
                    fontSize: '0.7rem',
                    letterSpacing: '0.15em',
                    color: 'rgba(200,176,138,0.7)',
                    marginBottom: 8,
                  }}
                >
                  비밀번호
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    style={{
                      width: '100%',
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(212,175,55,0.2)',
                      borderRadius: 3,
                      padding: '11px 44px 11px 14px',
                      fontFamily: "'EB Garamond', serif",
                      fontSize: '1rem',
                      color: '#e8d5b0',
                      outline: 'none',
                      transition: 'border-color 0.2s, background 0.2s',
                      boxSizing: 'border-box',
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'rgba(212,175,55,0.6)';
                      e.target.style.background = 'rgba(212,175,55,0.05)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(212,175,55,0.2)';
                      e.target.style.background = 'rgba(255,255,255,0.04)';
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      right: 12,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: 'rgba(200,176,138,0.5)',
                      fontSize: '0.85rem',
                      padding: 4,
                      display: 'flex',
                      alignItems: 'center',
                    }}
                    title={showPassword ? '숨기기' : '보기'}
                  >
                    {showPassword ? '🙈' : '👁️'}
                  </button>
                </div>
              </div>

              {/* 에러 메시지 */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    fontFamily: "'EB Garamond', serif",
                    fontSize: '0.88rem',
                    color: '#f87171',
                    background: 'rgba(248,113,113,0.08)',
                    border: '1px solid rgba(248,113,113,0.2)',
                    borderRadius: 3,
                    padding: '10px 14px',
                    textAlign: 'center',
                  }}
                >
                  {error}
                </motion.div>
              )}

              {/* 로그인 버튼 */}
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: isLoading ? 1 : 1.02 }}
                whileTap={{ scale: isLoading ? 1 : 0.98 }}
                style={{
                  width: '100%',
                  padding: '13px',
                  background: isLoading
                    ? 'rgba(212,175,55,0.3)'
                    : 'linear-gradient(135deg, #d4af37, #f0c040, #d4af37)',
                  border: 'none',
                  borderRadius: 3,
                  fontFamily: "'Cinzel', serif",
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  color: isLoading ? 'rgba(26,13,0,0.5)' : '#1a0d00',
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  transition: 'background 0.2s',
                  marginTop: 4,
                }}
              >
                {isLoading ? '입장 중...' : '서재 입장 →'}
              </motion.button>
            </form>

            {/* 구분선 */}
            <div
              style={{
                height: 1,
                background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.15), transparent)',
                margin: '28px 0 20px',
              }}
            />

            {/* 회원가입 링크 */}
            <div style={{ textAlign: 'center' }}>
              <span
                style={{
                  fontFamily: "'EB Garamond', serif",
                  fontSize: '0.9rem',
                  color: 'rgba(200,176,138,0.5)',
                  fontStyle: 'italic',
                }}
              >
                아직 서재 회원이 아니신가요?{' '}
              </span>
              <Link
                to="/register"
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: '0.78rem',
                  letterSpacing: '0.08em',
                  color: '#d4af37',
                  textDecoration: 'none',
                  borderBottom: '1px solid rgba(212,175,55,0.3)',
                  paddingBottom: 1,
                  transition: 'color 0.2s',
                }}
              >
                회원가입
              </Link>
            </div>

            {/* 데모 힌트 */}
            <div
              style={{
                marginTop: 20,
                padding: '10px 14px',
                background: 'rgba(212,175,55,0.04)',
                border: '1px solid rgba(212,175,55,0.1)',
                borderRadius: 3,
              }}
            >
              <div
                style={{
                  fontFamily: "'EB Garamond', serif",
                  fontSize: '0.78rem',
                  color: 'rgba(200,176,138,0.4)',
                  fontStyle: 'italic',
                  textAlign: 'center',
                  lineHeight: 1.6,
                }}
              >
                데모 계정: demo@library.dev / password123
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 하단 여백 */}
      <div style={{ height: 60 }} />
    </div>
  );
}
