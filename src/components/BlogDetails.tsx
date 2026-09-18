import { useNavigate, useParams } from "react-router-dom";

function BlogDetails() {
  const navigate = useNavigate();
  const { slug } = useParams();

  const blogs = [
    {
      slug: "how-to-choose-your-signature-scent",
      date: "AUGUST 30, 2026",
      category: "FRAGRANCE GUIDE",
      title: "How To Choose Your Signature Scent",
      image:
        "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&w=1600&q=90",
      intro:
        "Finding a signature fragrance is more than choosing a beautiful scent. It is about discovering a fragrance that feels like you.",
      paragraphs: [
        "A great fragrance becomes part of your identity. It can remind people of you, create memories and become something you reach for every day.",
        "The first step is understanding fragrance families. Floral, woody, oriental, fresh and gourmand fragrances all create very different impressions.",
        "Do not choose a fragrance simply because it smells beautiful on someone else. Fragrance reacts differently with every person's skin, which is why testing it directly on your skin is important.",
      ],
    },
    {
      slug: "the-art-of-modern-fragrance",
      date: "AUGUST 28, 2026",
      category: "FRAGRANCE JOURNAL",
      title: "The Art Of Modern Fragrance",
      image:
        "https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=1600&q=90",
      intro:
        "Modern perfumery combines traditional craftsmanship with contemporary creativity to create unforgettable fragrances.",
      paragraphs: [
        "Today's fragrances are designed around balance, personality and longevity.",
        "Modern perfumers carefully combine top, heart and base notes to create a fragrance that evolves throughout the day.",
        "The result is a scent that feels personal, sophisticated and unmistakably modern.",
      ],
    },
    {
      slug: "5-fragrance-notes-you-should-know",
      date: "AUGUST 25, 2026",
      category: "FRAGRANCE GUIDE",
      title: "5 Fragrance Notes You Should Know",
      image:
        "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1600&q=90",
      intro:
        "Understanding fragrance notes makes it easier to discover scents that match your personality and style.",
      paragraphs: [
        "Citrus notes create a fresh and energetic opening, while floral notes can add elegance and softness.",
        "Woody notes bring depth and sophistication, while amber and vanilla create warmth and sensuality.",
        "Learning these basic fragrance families makes choosing your next perfume much easier.",
      ],
    },
  ];

  const blog = blogs.find((item) => item.slug === slug);

  if (!blog) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#080808",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <h1
          style={{
            fontFamily: "Georgia, serif",
            fontWeight: "normal",
          }}
        >
          Article Not Found
        </h1>

        <button
          onClick={() => navigate("/")}
          style={{
            background: "#c5a46d",
            border: "none",
            padding: "13px 25px",
            cursor: "pointer",
            letterSpacing: "1px",
            fontSize: "11px",
            fontWeight: "700",
          }}
        >
          BACK TO HOME
        </button>
      </div>
    );
  }

  return (
    <div className="blog-details-page">
      <style>{`
        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          background: #080808;
          color: #f4f1eb;
          font-family: Arial, Helvetica, sans-serif;
        }

        .blog-details-page {
          min-height: 100vh;
          background:
            radial-gradient(
              circle at 50% 10%,
              rgba(197,164,109,.08),
              transparent 35%
            ),
            #080808;
        }

        .blog-container {
          width: min(1050px, 92%);
          margin: auto;
        }

        /* TOP */

        .article-top {
          padding: 35px 0 25px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #202020;
        }

        .article-logo {
          font-family: Georgia, serif;
          font-size: 27px;
          letter-spacing: 5px;
          color: #f4f1eb;
          cursor: pointer;
        }

        .article-logo span {
          color: #c5a46d;
        }

        .back-button {
          background: transparent;
          border: 1px solid #333;
          color: #aaa;
          padding: 10px 18px;
          font-size: 10px;
          letter-spacing: 1.5px;
          cursor: pointer;
          transition: .3s;
        }

        .back-button:hover {
          color: #c5a46d;
          border-color: #c5a46d;
          transform: translateX(-3px);
        }

        /* HERO */

        .article-header {
          text-align: center;
          padding: 90px 0 55px;
        }

        .article-category {
          color: #c5a46d;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 4px;
        }

        .article-date {
          color: #555;
          font-size: 10px;
          letter-spacing: 2px;
          margin-top: 15px;
        }

        .article-title {
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(42px, 6vw, 76px);
          line-height: 1.05;
          font-weight: normal;
          max-width: 900px;
          margin: 25px auto 0;
        }

        .article-title span {
          color: #c5a46d;
          font-style: italic;
        }

        .article-intro {
          max-width: 680px;
          margin: 28px auto 0;
          color: #888;
          font-size: 15px;
          line-height: 1.9;
        }

        /* IMAGE */

        .article-image-wrapper {
          position: relative;
          overflow: hidden;
          height: 560px;
          border: 1px solid #242424;
          background: #111;
        }

        .article-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 1s ease;
        }

        .article-image-wrapper:hover .article-image {
          transform: scale(1.025);
        }

        .image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(0,0,0,.05),
            rgba(0,0,0,.35)
          );
          pointer-events: none;
        }

        /* ARTICLE */

        .article-content {
          max-width: 760px;
          margin: 75px auto;
        }

        .article-content p {
          color: #999;
          font-size: 15px;
          line-height: 2;
          margin-bottom: 30px;
        }

        .article-content p:first-child {
          color: #ddd;
          font-size: 19px;
          line-height: 1.9;
        }

        .article-quote {
          border-left: 2px solid #c5a46d;
          padding: 15px 30px;
          margin: 55px 0;
          color: #ddd;
          font-family: Georgia, serif;
          font-size: 25px;
          line-height: 1.5;
          font-style: italic;
        }

        .article-subtitle {
          font-family: Georgia, serif;
          font-size: 32px;
          font-weight: normal;
          margin: 55px 0 25px;
        }

        .article-subtitle span {
          color: #c5a46d;
        }

        /* DIVIDER */

        .article-divider {
          height: 1px;
          background: #222;
          margin: 70px 0 35px;
        }

        /* SHARE */

        .article-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          padding-bottom: 80px;
        }

        .share-label {
          color: #555;
          font-size: 10px;
          letter-spacing: 2px;
        }

        .share-buttons {
          display: flex;
          gap: 8px;
        }

        .share-button {
          width: 36px;
          height: 36px;
          border: 1px solid #292929;
          background: #101010;
          color: #777;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          cursor: pointer;
          transition: .3s;
        }

        .share-button:hover {
          color: #000;
          background: #c5a46d;
          border-color: #c5a46d;
        }

        /* FOOTER */

        .article-footer {
          border-top: 1px solid #202020;
          padding: 35px 0;
          text-align: center;
          color: #444;
          font-size: 9px;
          letter-spacing: 2px;
        }

        @media(max-width: 768px) {
          .article-header {
            padding: 60px 0 40px;
          }

          .article-title {
            font-size: 42px;
          }

          .article-image-wrapper {
            height: 380px;
          }

          .article-content {
            margin: 50px auto;
          }

          .article-content p:first-child {
            font-size: 17px;
          }

          .article-quote {
            font-size: 21px;
            padding-left: 20px;
          }

          .article-bottom {
            flex-direction: column;
            align-items: flex-start;
          }
        }

        @media(max-width: 480px) {
          .article-top {
            padding: 25px 0;
          }

          .article-logo {
            font-size: 21px;
          }

          .back-button {
            padding: 8px 12px;
          }

          .article-title {
            font-size: 36px;
          }

          .article-image-wrapper {
            height: 300px;
          }
        }
      `}</style>

      {/* TOP BAR */}

      <div className="blog-container">
        <div className="article-top">
          <div
            className="article-logo"
            onClick={() => navigate("/")}
          >
            NOIR<span>.</span>
          </div>

          <button
            className="back-button"
            onClick={() => navigate("/")}
          >
            ← BACK TO HOME
          </button>
        </div>

        {/* ARTICLE HEADER */}

        <header className="article-header">
          <div className="article-category">
            {blog.category}
          </div>

          <div className="article-date">
            {blog.date}
          </div>

          <h1 className="article-title">
            {blog.title}
          </h1>

          <p className="article-intro">
            {blog.intro}
          </p>
        </header>

        {/* FEATURE IMAGE */}

        <div className="article-image-wrapper">
          <img
            className="article-image"
            src={blog.image}
            alt={blog.title}
          />

          <div className="image-overlay" />
        </div>

        {/* ARTICLE CONTENT */}

        <article className="article-content">
          <p>{blog.paragraphs[0]}</p>

          <p>{blog.paragraphs[1]}</p>

          <div className="article-quote">
            "A fragrance should feel like an invisible signature —
            memorable, personal and unmistakably yours."
          </div>

          <h2 className="article-subtitle">
            Discover Your <span>Signature</span>
          </h2>

          <p>{blog.paragraphs[2]}</p>

          <p>
            Take your time when exploring a new fragrance. Notice how
            the opening develops, how the heart becomes softer and how
            the base remains on your skin throughout the day.
          </p>

          <p>
            Most importantly, choose something that makes you feel
            confident. The best fragrance is not necessarily the most
            expensive one — it is the one that feels right when you
            wear it.
          </p>

          <div className="article-divider" />

          <div className="article-bottom">
            <div className="share-label">
              SHARE THIS ARTICLE
            </div>

            <div className="share-buttons">
              <button className="share-button">IG</button>
              <button className="share-button">FB</button>
              <button className="share-button">X</button>
              <button className="share-button">PIN</button>
            </div>
          </div>
        </article>
      </div>

      <footer className="article-footer">
        © 2026 NOIR. ALL RIGHTS RESERVED.
      </footer>
    </div>
  );
}

export default BlogDetails;