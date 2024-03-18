import Header from './_component/common/Header'

export default function Home() {
  return (
    <div id="wrap">
      <Header />
      <main className='container'>
        <section className='content'>

          <div className='post__wrap'>
            <div className='post__header'>
              <h2 className='tit'>인기 있는 게시글</h2>
            </div>
            <div className='post__content'>
              <div className='post__item'>
                <div className='post__thum'></div>
                <dl>
                  <dt>title title title title title title title</dt>
                  <dd>
                    <ul className='d-list'>
                      <li>0</li>
                      <li>username</li>
                      <li>date</li>
                    </ul>
                  </dd>
                </dl>
              </div>

              <div className='post__item'>
                <div className='post__thum'></div>
                <dl>
                  <dt>title title title title title title title</dt>
                  <dd>
                    <ul className='d-list'>
                      <li>0</li>
                      <li>username</li>
                      <li>date</li>
                    </ul>
                  </dd>
                </dl>
              </div>
              
            </div>
          </div>
        </section>
        <aside>
          <h2>aside</h2>
        </aside>
      </main>
    </div>
  );
}
