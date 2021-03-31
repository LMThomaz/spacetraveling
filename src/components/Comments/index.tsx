import { useEffect, useRef } from 'react';

export default function Comments(): JSX.Element {
  const commentRef = useRef<HTMLDivElement>();

  useEffect(() => {
    if (commentRef.current.hasChildNodes()) {
      return;
    }

    const scriptEl = document.createElement('script');
    scriptEl.setAttribute('src', 'https://utteranc.es/client.js');
    scriptEl.setAttribute('crossorigin', 'anonymous');
    scriptEl.setAttribute('async', 'true');
    scriptEl.setAttribute('repo', 'LMThomaz/spacetraveling');
    scriptEl.setAttribute('issue-term', 'pathname');
    scriptEl.setAttribute('theme', 'github-dark');
    commentRef.current.appendChild(scriptEl);
  });

  return <div ref={commentRef} />;
}
