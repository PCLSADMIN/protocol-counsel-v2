'use client';

import Link from 'next/link';

export default function NewsPage() {
  const articles = [
    {
      id: 1,
      title: 'The Evolution of Process Service Verification',
      category: 'Infrastructure',
      date: 'May 12, 2024',
      readTime: '6 min',
      excerpt: 'GPS-verified delivery and immutable documentation are reshaping how courts accept proof of service in modern litigation.',
    },
    {
      id: 2,
      title: 'Field Coordination at Scale: AI-Driven Routing',
      category: 'Technology',
      date: 'May 8, 2024',
      readTime: '5 min',
      excerpt: 'How machine learning algorithms optimize field agent deployment across 50-state service networks.',
    },
    {
      id: 3,
      title: 'Chain of Custody in Digital Legal Operations',
      category: 'Compliance',
      date: 'May 3, 2024',
      readTime: '7 min',
      excerpt: 'Building trust through immutable audit trails in high-stakes proceedings.',
    },
    {
      id: 4,
      title: 'The Third-Party Provider Model',
      category: 'Operations',
      date: 'April 28, 2024',
      readTime: '5 min',
      excerpt: 'Why infrastructure-as-a-service beats in-house delivery for scaling law firms.',
    },
    {
      id: 5,
      title: 'GDPR and American Legal Operations',
      category: 'Compliance',
      date: 'April 22, 2024',
      readTime: '8 min',
      excerpt: 'Data processing requirements for firms handling EU matters.',
    },
  ];

  return (
    <main className="min-h-screen bg-oxford">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-oxford/95 border-b border-slate-700">
        <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-serif font-bold text-white">PROTOCOL<span className="text-[#D4AF37]">COUNSEL</span></Link>
          <div className="flex items-center gap-6">
            <Link href="/news" className="text-white text-sm font-medium">Protocol Intelligence</Link>
            <Link href="/portal/login" className="text-slate-300 text-sm">Login</Link>
          </div>
        </div>
      </nav>

      <header className="pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl font-serif font-bold text-white mb-2">Protocol Intelligence</h1>
          <p className="text-slate-400">Editorial insights on legal infrastructure and operations.</p>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 pb-16">
        <section className="border-t border-slate-700">
          {articles.map((article) => (
            <article key={article.id} className="border-b border-slate-700 py-8">
              <div className="flex items-center gap-4 mb-3">
                <span className="text-xs text-[#D4AF37] uppercase tracking-wider">{article.category}</span>
                <span className="text-xs text-slate-500">{article.date}</span>
                <span className="text-xs text-slate-500">{article.readTime} read</span>
              </div>
              <h2 className="text-xl font-semibold text-white mb-2">{article.title}</h2>
              <p className="text-slate-400">{article.excerpt}</p>
              <button className="text-[#D4AF37] text-sm font-medium mt-4 hover:underline">Read Article</button>
            </article>
          ))}
        </section>

        <footer className="mt-16 pt-8 border-t border-slate-700 text-center text-slate-500 text-sm">
          <p>Protocol Counsel. Managed by Streamline Industries Management.</p>
        </footer>
      </div>
    </main>
  );
}