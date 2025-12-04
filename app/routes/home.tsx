import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";
import ResumeCard from "~/components/ResumeCard";
import {usePuterStore} from "~/lib/puter";
import {Link, useNavigate} from "react-router";
import {useEffect, useState} from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resumind" },
    { name: "description", content: "Smart feedback for your dream job!" },
  ];
}

export default function Home() {
  const { auth, kv } = usePuterStore();
  const navigate = useNavigate();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loadingResumes, setLoadingResumes] = useState(false);

  useEffect(() => {
    if(!auth.isAuthenticated) navigate('/auth?next=/');
  }, [auth.isAuthenticated])

  useEffect(() => {
    const loadResumes = async () => {
      setLoadingResumes(true);

      const resumes = (await kv.list('resume:*', true)) as KVItem[];

      const parsedResumes = resumes?.map((resume) => (
          JSON.parse(resume.value) as Resume
      ))

      setResumes(parsedResumes || []);
      setLoadingResumes(false);
    }

    loadResumes()
  }, []);

  return (
    <main className="min-h-screen bg-[#1a1a2e]">
      <Navbar />

      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="mb-16 text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
              Track Your Applications & Resume Ratings
            </span>
          </h1>
          {!loadingResumes && resumes?.length === 0 ? (
            <p className="text-xl text-white/70">
              No resumes found. Upload your first resume to get feedback.
            </p>
          ) : (
            <p className="text-xl text-white/70">
              Review your submissions and check AI-powered feedback.
            </p>
          )}
        </div>

        {/* Loading State */}
        {loadingResumes && (
          <div className="flex flex-col items-center justify-center py-20">
            <img 
              src="/images/resume-scan-2.gif" 
              className="w-[200px]" 
              alt="Loading"
            />
            <p className="text-white/60 mt-4">Loading your resumes...</p>
          </div>
        )}

        {/* Resumes Grid */}
        {!loadingResumes && resumes.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {resumes.map((resume) => (
              <ResumeCard key={resume.id} resume={resume} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loadingResumes && resumes?.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="mb-8">
              <div className="w-32 h-32 rounded-2xl bg-[#2a2a4e] border-2 border-dashed border-white/20 flex items-center justify-center">
                <svg className="w-16 h-16 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
            </div>

            <h3 className="text-3xl font-semibold text-white mb-3">
              Upload Your Resume
            </h3>
            <p className="text-white/60 mb-10 text-center max-w-2xl text-lg">
              Click the button above or drop your resume in here.
            </p>
            <p className="text-white/50 mb-8">
              English resumes in <span className="font-semibold">PDF (or DOCX)</span> only. Max 2MB file size.
            </p>

            <Link 
              to="/upload" 
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-4 rounded-full font-semibold text-lg transition-colors duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              Upload Resume
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}