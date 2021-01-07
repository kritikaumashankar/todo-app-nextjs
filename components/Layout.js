import Head from 'next/head';
const Layout= ({ children }) =>(
  <>
    <Head>
      <title> Todo App </title>
      <link rel="stylesheet" ref="https://bootswatch.com/4/sketchy/bootstrap.min.css" />
    </Head>
    {children}
  </>
)

export default Layout