'use client';

import React, { useState } from 'react';
import useSWR from 'swr';
import Link from 'next/link';
import {
  Users,
  Linkedin,
  Github,
  Mail,
  Award,
  ArrowRight,
  Shield,
  Search,
  Sparkles,
} from 'lucide-react';
import { fetcher } from '../../lib/api';
import { EmptyState } from '../../components/EmptyState';

// Distinct IEEE-themed Arch Pillar gradients for Core Leads (Inspired by Reference Design 1)
const corePillarThemes = [
  {
    bg: 'bg-gradient-to-b from-[#002855] via-[#003875] to-[#001f3f]',
    badgeBg: 'bg-cyan-400/20 text-cyan-200 border-cyan-300/40',
    deptTag: 'text-cyan-300',
    socialHover: 'hover:text-cyan-300',
  },
  {
    bg: 'bg-gradient-to-b from-[#00629b] via-[#0072ce] to-[#004f7c]',
    badgeBg: 'bg-white/25 text-white border-white/40',
    deptTag: 'text-blue-100',
    socialHover: 'hover:text-blue-200',
  },
  {
    bg: 'bg-gradient-to-b from-[#0f4c81] via-[#005a9e] to-[#002e5b]',
    badgeBg: 'bg-cyan-300/20 text-cyan-100 border-cyan-200/40',
    deptTag: 'text-cyan-200',
    socialHover: 'hover:text-cyan-200',
  },
  {
    bg: 'bg-gradient-to-b from-[#0284c7] via-[#0369a1] to-[#0c4a6e]',
    badgeBg: 'bg-white/25 text-white border-white/40',
    deptTag: 'text-sky-100',
    socialHover: 'hover:text-sky-200',
  },
];

// Organic Fluid Blob shapes & IEEE gradients for Regular Members (Inspired by Reference Design 2)
const blobShapes = [
  'rounded-[44%_56%_65%_35%/52%_42%_58%_48%]',
  'rounded-[56%_44%_40%_60%/45%_60%_40%_55%]',
  'rounded-[40%_60%_55%_45%/58%_38%_62%_42%]',
  'rounded-[52%_48%_68%_32%/38%_65%_35%_62%]',
];

const blobGradients = [
  'from-[#00629b] to-[#00b5e2]',
  'from-[#002855] to-[#0072ce]',
  'from-[#0284c7] to-[#38bdf8]',
  'from-[#1e3a8a] to-[#2563eb]',
];

export default function TeamPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: membersRes, isLoading } = useSWR('/members', fetcher);

  const grouped = membersRes?.grouped || {
    core_team: [],
    regular_member: [],
  };

  const coreTeam = grouped.core_team || [];
  // Merge regular_member and any legacy content_member into regularMembers
  const regularMembers = [
    ...(grouped.regular_member || []),
    ...(grouped.content_member || []),
  ];

  const filteredCore = coreTeam.filter((m: any) => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    return (
      m.name?.toLowerCase().includes(term) ||
      m.designation?.toLowerCase().includes(term) ||
      m.department?.toLowerCase().includes(term)
    );
  });

  const filteredRegular = regularMembers.filter((m: any) => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    return (
      m.name?.toLowerCase().includes(term) ||
      m.designation?.toLowerCase().includes(term) ||
      m.department?.toLowerCase().includes(term)
    );
  });

  return (
    <div className="py-16 bg-[#e8edf5] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Page Hero Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full neu-pill text-xs font-bold uppercase tracking-widest text-ieee-blue">
            <Sparkles className="w-3.5 h-3.5 text-ieee-cyan" />
            <span>Student Leadership & Directory</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-800">
            Meet our <span className="bg-gradient-to-r from-ieee-blue via-ieee-cyan to-ieee-dark bg-clip-text text-transparent">Branch Team</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto">
            We believe in nurturing exceptional technical talent and cultivating a dynamic ecosystem where
            creativity, engineering innovation, and student leadership flourish.
          </p>

          {/* Neumorphic Search Bar */}
          <div className="pt-2 max-w-md mx-auto">
            <div className="relative neu-inset rounded-2xl">
              <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search member by name, role, or department..."
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-transparent text-xs text-slate-800 placeholder-slate-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Institutional Dignitaries Banner Link */}
          <div className="neu-card rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 border border-white/70 text-left">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#e8edf5] shadow-[inset_2px_2px_5px_#c4d0e0,inset_-2px_-2px_5px_#ffffff] text-ieee-blue flex items-center justify-center shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">
                  Looking for our Institutional Dignitaries & Branch Counselor?
                </p>
                <p className="text-[11px] text-slate-500 font-medium">
                  College patrons and branch counselors (with words of wisdom) are prominently featured on the Home Page.
                </p>
              </div>
            </div>
            <Link
              href="/"
              className="neu-btn px-4 py-2.5 rounded-xl text-xs font-bold text-ieee-blue hover:text-ieee-dark transition shrink-0 flex items-center gap-1.5"
            >
              <span>View Dignitaries</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 1. EXECUTIVE CORE LEADS SECTION (Arch Pillar Format - Image 1) */}
        {/* ============================================================ */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-300/50 pb-4">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-ieee-blue neu-pill px-3 py-1 inline-block mb-2">
                Executive Council
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
                Executive Core Leads
              </h2>
              <p className="text-xs text-slate-500 font-medium mt-1">
                Branch council officers, domain directors, and lead organizers
              </p>
            </div>
            <div className="text-xs font-bold text-slate-500">
              {filteredCore.length} {filteredCore.length === 1 ? 'Lead' : 'Leads'}
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center p-16">
              <div className="w-10 h-10 border-4 border-ieee-blue border-t-transparent rounded-full animate-spin" />
            </div>
          ) : filteredCore.length === 0 ? (
            <EmptyState
              icon={Users}
              title="No Core Leads Found"
              description="Student branch executive council details are being updated for this academic term."
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pt-4">
              {filteredCore.map((member: any, index: number) => {
                const theme = corePillarThemes[index % corePillarThemes.length];
                return (
                  <div
                    key={member._id}
                    className="relative group flex flex-col justify-between overflow-hidden rounded-t-[5.5rem] rounded-b-[2rem] shadow-[-10px_-10px_24px_#ffffff,10px_10px_24px_#c4d0e0] border-2 border-white/70 hover:translate-y-[-8px] transition-all duration-500"
                    style={{ minHeight: '520px' }}
                  >
                    {/* Full Pillar Portrait Photo (Initially Visible) */}
                    <div className="absolute inset-0 w-full h-full overflow-hidden">
                      {member.photoUrl ? (
                        <>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={member.photoUrl}
                            alt={member.name}
                            className="w-full h-full object-cover object-top filter brightness-105 contrast-105 group-hover:scale-110 transition-transform duration-700 ease-out"
                          />
                        </>
                      ) : (
                        <div className={`w-full h-full ${theme.bg} flex flex-col items-center justify-center text-white/50`}>
                          <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-3xl font-black text-white/80 border border-white/20">
                            {member.name.charAt(0)}
                          </div>
                          <span className="text-[11px] font-mono uppercase tracking-wider text-white/60 mt-2 font-semibold">
                            IEEE Lead
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Shoulder Folded Ribbon Badge */}
                    <div className="absolute top-6 right-0 z-20 pointer-events-none">
                      <div className={`backdrop-blur-md px-3.5 py-1 rounded-l-full text-[9px] font-black uppercase tracking-widest border-l border-t border-b shadow-sm ${theme.badgeBg}`}>
                        ★ Core Lead
                      </div>
                    </div>

                    {/* Initial State: Subtle Bottom Card Identifier */}
                    <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/90 via-black/45 to-transparent pt-24 pb-6 px-5 text-center transition-opacity duration-300 group-hover:opacity-0 pointer-events-none">
                      {member.department && (
                        <span className={`text-[10px] font-mono uppercase font-bold tracking-widest opacity-90 ${theme.deptTag}`}>
                          {member.department}
                        </span>
                      )}
                      <h3 className="text-xl font-black uppercase tracking-tight text-white leading-tight drop-shadow-md">
                        {member.name}
                      </h3>
                      <p className="text-xs font-semibold text-white/85 uppercase tracking-wider mt-0.5">
                        {member.designation}
                      </p>
                    </div>

                    {/* Hover State: Full Info & Social Links Overlay Above Image */}
                    <div className={`absolute inset-0 z-30 ${theme.bg} bg-opacity-90 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out flex flex-col justify-center items-center p-6 text-center`}>
                      {/* Pattern Grid inside overlay */}
                      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(circle_at_1px_1px,#ffffff_1px,transparent_0)] [background-size:16px_16px] pointer-events-none" />

                      <div className="relative z-10 flex flex-col items-center max-w-[90%] transform translate-y-3 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                        <span className={`backdrop-blur-md px-3.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border shadow-sm mb-3 ${theme.badgeBg}`}>
                          ★ Core Lead
                        </span>

                        {member.department && (
                          <span className={`text-[11px] font-mono uppercase font-bold tracking-widest mb-1 opacity-90 ${theme.deptTag}`}>
                            {member.department}
                          </span>
                        )}

                        <h3 className="text-2xl font-black uppercase tracking-tight text-white leading-tight drop-shadow-md">
                          {member.name}
                        </h3>

                        <p className="text-xs font-bold text-cyan-200 mt-1 uppercase tracking-wider">
                          {member.designation}
                        </p>

                        {/* Social Links on Hover */}
                        <div className="flex items-center justify-center gap-3 mt-6">
                          {member.socialLinks?.linkedin && (
                            <a
                              href={member.socialLinks.linkedin}
                              target="_blank"
                              rel="noreferrer"
                              className="w-10 h-10 rounded-full bg-white/15 hover:bg-white text-white hover:text-blue-700 backdrop-blur-md flex items-center justify-center transition shadow-md hover:scale-110"
                              title="LinkedIn Profile"
                            >
                              <Linkedin className="w-4 h-4" />
                            </a>
                          )}
                          {member.socialLinks?.github && (
                            <a
                              href={member.socialLinks.github}
                              target="_blank"
                              rel="noreferrer"
                              className="w-10 h-10 rounded-full bg-white/15 hover:bg-white text-white hover:text-slate-900 backdrop-blur-md flex items-center justify-center transition shadow-md hover:scale-110"
                              title="GitHub Profile"
                            >
                              <Github className="w-4 h-4" />
                            </a>
                          )}
                          {member.email && (
                            <a
                              href={`mailto:${member.email}`}
                              className="w-10 h-10 rounded-full bg-white/15 hover:bg-white text-white hover:text-ieee-blue backdrop-blur-md flex items-center justify-center transition shadow-md hover:scale-110"
                              title="Email Lead"
                            >
                              <Mail className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* ============================================================ */}
        {/* 2. REGULAR MEMBERS SECTION (Organic Fluid Blob Format - Image 2) */}
        {/* ============================================================ */}
        <section className="space-y-8 pt-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-300/50 pb-4">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-ieee-cyan neu-pill px-3 py-1 inline-block mb-2">
                Branch Directory
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
                Our Members & Innovators
              </h2>
              <p className="text-xs text-slate-500 font-medium mt-1">
                Active student branch members, research associates, and technical contributors
              </p>
            </div>
            <div className="text-xs font-bold text-slate-500">
              {filteredRegular.length} {filteredRegular.length === 1 ? 'Member' : 'Members'}
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center p-12">
              <div className="w-8 h-8 border-4 border-ieee-blue border-t-transparent rounded-full animate-spin" />
            </div>
          ) : filteredRegular.length === 0 ? (
            <EmptyState
              icon={Users}
              title="No Regular Members Found"
              description="New student members joining in current induction drive will appear here."
            />
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-8">
              {filteredRegular.map((m: any, idx: number) => {
                const blobShape = blobShapes[idx % blobShapes.length];
                const blobGradient = blobGradients[idx % blobGradients.length];

                return (
                  <div
                    key={m._id}
                    className="neu-card rounded-3xl p-6 border border-white/70 text-center flex flex-col items-center justify-between hover:shadow-[-10px_-10px_20px_#ffffff,10px_10px_20px_#c4d0e0] hover:translate-y-[-4px] transition-all duration-300 group"
                  >
                    <div className="w-full flex flex-col items-center">
                      {/* Photo Container with Organic Fluid Blob & Boundary-Free Portrait (Reference 2 style) */}
                      <div className="relative w-36 h-44 mb-4 flex items-end justify-center">
                        {/* Organic Fluid Blob Backdrop */}
                        <div
                          className={`absolute inset-x-1.5 top-2 bottom-3 bg-gradient-to-br ${blobGradient} ${blobShape} transform transition-all duration-500 group-hover:scale-105 group-hover:rotate-3 shadow-md opacity-90`}
                        />

                        {/* Boundary-Free Portrait with Soft Dissolve Mask at Bottom */}
                        <div className="relative z-10 w-32 h-40 overflow-hidden flex items-end justify-center [mask-image:linear-gradient(to_bottom,black_68%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_68%,transparent_100%)]">
                          {m.photoUrl ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={m.photoUrl}
                              alt={m.name}
                              className="w-full h-full object-cover object-top rounded-t-3xl filter contrast-105 group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <div className="w-full h-full rounded-t-3xl text-white font-black flex items-center justify-center text-3xl pb-6">
                              {m.name.charAt(0)}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Designation subtitle (Small font like Reference 2) */}
                      <p className="text-[11px] font-bold uppercase tracking-wider text-ieee-blue">
                        {m.designation || 'Student Member'}
                      </p>

                      {/* Full Name */}
                      <h4 className="text-base font-extrabold text-slate-800 tracking-tight mt-1 truncate w-full">
                        {m.name}
                      </h4>

                      {/* Department */}
                      {m.department && (
                        <p className="text-[11px] text-slate-500 font-medium mt-0.5 truncate w-full">
                          {m.department}
                        </p>
                      )}
                    </div>

                    {/* Contact & Social Links */}
                    <div className="mt-5 pt-3 border-t border-slate-300/40 w-full flex items-center justify-center gap-2">
                      {m.socialLinks?.linkedin && (
                        <a
                          href={m.socialLinks.linkedin}
                          target="_blank"
                          rel="noreferrer"
                          className="neu-btn p-1.5 rounded-xl text-slate-500 hover:text-blue-600 transition"
                          title="LinkedIn"
                        >
                          <Linkedin className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {m.socialLinks?.github && (
                        <a
                          href={m.socialLinks.github}
                          target="_blank"
                          rel="noreferrer"
                          className="neu-btn p-1.5 rounded-xl text-slate-500 hover:text-slate-900 transition"
                          title="GitHub"
                        >
                          <Github className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {m.email && (
                        <a
                          href={`mailto:${m.email}`}
                          className="neu-btn p-1.5 rounded-xl text-slate-500 hover:text-ieee-blue transition"
                          title={m.email}
                        >
                          <Mail className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
