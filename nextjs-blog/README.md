This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.



## My Note

- 页面路由： 通过pages里的目录构建路由
> 例如：pages/my/blog.js或者pages/my/blog/index.js对应的是这个路由 -> /my/blog 

- 页面跳转：用next/link的`<Link />`组件
> `<a></a>`可以跳转nextjs外的页面；

Link和<a>的区别：前者是通过js实现的页面更新，浏览器实际上没有做刷新（快）；后者是普通的超链接，浏览器会刷新（慢）

- 静态资源：在public文件夹下管理
> 例如： `<img src="/img.png" /> `中的图片会从public中取

- 修改meta元素：
> 例如： `next/head`提供的`Head`组件可以修改`html`的`head`头元素的内容