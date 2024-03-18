
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
        <p>에프터 페이지</p>
        {children}
    </div>
  );
}
