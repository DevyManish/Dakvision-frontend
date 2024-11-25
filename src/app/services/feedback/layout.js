import Header from '@/components/layout/header';

export const metadata = {
  title: 'DakSeva Feedback',
  description: 'Easy to complain and resolve your problems.'
};

export default function FeedbackLayout({ children }) {
  return (
    <div className="flex">
      <main className="w-full flex-1 overflow-hidden">
        <Header />
        {children}
      </main>
    </div>
  );
}
