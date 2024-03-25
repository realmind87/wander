
import {Session} from "@auth/core/types";
import RecentSearch from '../aside/RecentSearch';
import PostForm from "../form/PostForm";

type UserProps = {
  session: Session | null,
  searchParams?: {q: string, f?: string, pf?: string}
}

const Aside = ({session}: UserProps) => {
    return (
        <aside>
            {session?.user && <PostForm session={session} />}
            <RecentSearch />
            {session?.user && 
                <dl className="follow-terms">
                    <dt>팔로우 목록</dt>
                    <dd>
                        <p className='txt-nodata'>팔로우 목록이 없습니다.</p>
                        {/* <ul className="terms-list">
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
                        </ul> */}
                    </dd>
                </dl>
            }
          
        </aside>
    )
}

export default Aside