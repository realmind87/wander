export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <p>홈 레이어</p>
      <div>{children}</div>
    </div>
  );
}
