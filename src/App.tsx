import { useEffect, useState } from 'react';
import { useTheme } from './hooks/useTheme';
import { useReveal } from './hooks/useReveal';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { WhyMe } from './components/WhyMe';
import { Contact } from './components/Contact';
import { Footer, BackToTop } from './components/Footer';
import { CaseStudy } from './components/CaseStudy';

function getProjectIdFromHash(): string | null {
  const match = window.location.hash.match(/^#\/projects\/([^/?#]+)/);
  return match ? decodeURIComponent(match[1]) : null;
}

function App() {
  const { theme, toggle } = useTheme();
  const [projectId, setProjectId] = useState<string | null>(() =>
    typeof window === 'undefined' ? null : getProjectIdFromHash(),
  );

  useReveal([projectId]);

  useEffect(() => {
    const onHashChange = () => setProjectId(getProjectIdFromHash());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [projectId]);

  const openCaseStudy = (id: string) => {
    window.location.hash = `#/projects/${id}`;
  };

  const backToProjects = () => {
    window.location.hash = '#projects';
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Navbar theme={theme} toggleTheme={toggle} />
      <main>
        {projectId ? (
          <CaseStudy projectId={projectId} onBack={backToProjects} onOpenProject={openCaseStudy} />
        ) : (
          <>
            <Hero theme={theme} />
            <About />
            <Services />
            <Skills />
            <Experience />
            <Projects onOpenCaseStudy={openCaseStudy} />
            <WhyMe />
            <Contact />
          </>
        )}
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}

export default App;
