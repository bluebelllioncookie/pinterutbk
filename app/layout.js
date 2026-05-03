export const metadata = {
  title: "UTBK SNBT Study Hub",
  description: "Platform belajar UTBK",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
