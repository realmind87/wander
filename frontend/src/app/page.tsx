import Link from "next/link";
import Header from "./_component/common/Header";
import { GoCommentDiscussion } from "react-icons/go";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoMdHeart } from "react-icons/io";
import { IoIosClose } from "react-icons/io";
import { BsPersonCircle } from "react-icons/bs";
import Search from "./_component/form/Search";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import ko from "dayjs/locale/ko";

dayjs.extend(relativeTime);
dayjs.locale(ko);

export default function Home() {
  return (
    <div id="wrap">
      <Header />
      <main className="container">
        <section className="content">
          <div className="post__wrap">
            <div className="post__header">
              <h2 className="tit">최근 게시글</h2>
            </div>
            <div className="post__content">
              <div className="post__item">
                <div className="post__thum"></div>
                <dl>
                  <dt>title title title title title title title</dt>
                  <dd>
                    <ul className="d-list">
                      <li>
                        <BsPersonCircle size={16} color="#dfdfdf" />
                        username
                      </li>
                      <li>
                        <GoCommentDiscussion size={12} />
                        <span className="co-number">0</span>
                      </li>
                      <li>{dayjs(new Date()).toNow(true)}</li>
                    </ul>
                  </dd>
                </dl>
                <button type="button" className="btn-like">
                  <IoIosHeartEmpty size={18} color="#e2757a" />
                  <span className="like-number">10</span>
                </button>
              </div>
              <div className="post__item">
                <div className="post__thum"></div>
                <dl>
                  <dt>title title title title title title title</dt>
                  <dd>
                    <ul className="d-list">
                      <li>
                        <BsPersonCircle size={16} color="#dfdfdf" />
                        username
                      </li>
                      <li>
                        <GoCommentDiscussion size={12} />
                        <span className="co-number">0</span>
                      </li>
                      <li>{dayjs(new Date()).toNow(true)}</li>
                    </ul>
                  </dd>
                </dl>
                <button type="button" className="btn-like">
                  <IoMdHeart size={18} color="#e2757a" />
                  <span className="like-number">10</span>
                </button>
              </div>
            </div>
          </div>
        </section>
        <aside>
          <Search />
          <dl className="search-terms">
            <dt>최근 검색어</dt>
            <dd>
              {/* <p className='txt-nodata'>최근 검색이 없습니다.</p> */}
              <ul className="terms-list">
                <li>
                  <Link href="" className="search-link">
                    검색 1
                  </Link>
                  <button type="button" className="btn-del">
                    <IoIosClose size={18} />
                  </button>
                </li>
                <li>
                  <Link href="" className="search-link">
                    검색 2
                  </Link>
                  <button type="button" className="btn-del">
                    <IoIosClose size={18} />
                  </button>
                </li>
                <li>
                  <Link href="" className="search-link">
                    검색 3
                  </Link>
                  <button type="button" className="btn-del">
                    <IoIosClose size={18} />
                  </button>
                </li>
                <li>
                  <Link href="" className="search-link">
                    검색 4
                  </Link>
                  <button type="button" className="btn-del">
                    <IoIosClose size={18} />
                  </button>
                </li>
                <li>
                  <Link href="" className="search-link">
                    검색 5
                  </Link>
                  <button type="button" className="btn-del">
                    <IoIosClose size={18} />
                  </button>
                </li>
              </ul>
            </dd>
          </dl>
          <dl className="follow-terms">
            <dt>팔로우 목록</dt>
            <dd>
              {/* <p className='txt-nodata'>팔로우 목록이 없습니다.</p> */}
              <ul className="terms-list">
                <li>
                  <button type="button" className="btn-del">
                    <BsPersonCircle size={32} color="#dfdfdf" />
                  </button>
                  <Link href="" className="follow-link">
                    김아무개111111
                  </Link>
                </li>
                <li>
                  <button type="button" className="btn-del">
                    <BsPersonCircle size={32} color="#dfdfdf" />
                  </button>
                  <Link href="" className="follow-link">
                    김아무개22222
                  </Link>
                </li>
              </ul>
            </dd>
          </dl>
        </aside>
      </main>
    </div>
  );
}
