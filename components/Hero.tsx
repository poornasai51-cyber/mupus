'use client';

import Link from 'next/link';

interface HeroProps {
  headline: string;
  subtext: string;
}

export default function Hero({ headline, subtext }: HeroProps) {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden">
      {/* Forest Background SVG */}
      <div className="absolute inset-0 z-0">
        <svg
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <defs>
            <linearGradient id="skyG" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0D4F4A" />
              <stop offset="50%" stopColor="#115e59" />
              <stop offset="100%" stopColor="#134e4a" />
            </linearGradient>
            <linearGradient id="mtnG" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0f766e" />
              <stop offset="100%" stopColor="#0a3d3a" />
            </linearGradient>
            <linearGradient id="midG" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#14b8a6" />
              <stop offset="100%" stopColor="#0f766e" />
            </linearGradient>
            <linearGradient id="frtG" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0d9488" />
              <stop offset="100%" stopColor="#051515" />
            </linearGradient>
            <linearGradient id="drkG" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0a3d3a" />
              <stop offset="100%" stopColor="#021c1b" />
            </linearGradient>
            <radialGradient id="moonG" cx="50%" cy="0%" r="55%">
              <stop offset="0%" stopColor="rgba(20, 184, 166, 0.2)" />
              <stop offset="60%" stopColor="rgba(13, 148, 136, 0.08)" />
              <stop offset="100%" stopColor="rgba(0, 0, 0, 0)" />
            </radialGradient>
            <radialGradient id="horizG" cx="50%" cy="100%" r="60%">
              <stop offset="0%" stopColor="rgba(20, 184, 166, 0.15)" />
              <stop offset="100%" stopColor="rgba(0, 0, 0, 0)" />
            </radialGradient>
            <filter id="sBlur">
              <feGaussianBlur stdDeviation="0.6" />
            </filter>
          </defs>

          {/* Sky */}
          <rect width="1440" height="900" fill="url(#skyG)" />
          {/* Moon glow */}
          <ellipse cx="720" cy="0" rx="600" ry="320" fill="url(#moonG)" />
          {/* Horizon glow */}
          <ellipse cx="720" cy="900" rx="700" ry="350" fill="url(#horizG)" />

          {/* Stars */}
          <g fill="rgba(152, 245, 235, 0.6)" filter="url(#sBlur)">
            <circle cx="112" cy="55" r="1" />
            <circle cx="234" cy="38" r="0.8" />
            <circle cx="374" cy="72" r="1" />
            <circle cx="494" cy="28" r="0.7" />
            <circle cx="644" cy="50" r="1.1" />
            <circle cx="804" cy="32" r="0.8" />
            <circle cx="944" cy="65" r="1" />
            <circle cx="1094" cy="42" r="0.9" />
            <circle cx="1274" cy="58" r="1" />
            <circle cx="1374" cy="35" r="0.7" />
            <circle cx="188" cy="100" r="0.7" />
            <circle cx="424" cy="118" r="0.8" />
            <circle cx="714" cy="95" r="0.7" />
            <circle cx="1044" cy="108" r="0.9" />
            <circle cx="1334" cy="88" r="0.7" />
            <circle cx="58" cy="142" r="0.6" />
            <circle cx="862" cy="130" r="0.8" />
            <circle cx="1180" cy="145" r="0.6" />
          </g>

          {/* Distant mountains */}
          <path
            d="M0 510 Q180 355 360 398 Q540 440 720 315 Q900 195 1080 378 Q1260 440 1440 415 L1440 900 L0 900Z"
            fill="#051515"
            opacity="0.96"
          />

          {/* Far forest ridge */}
          <path
            d="M0,560 L0,900 L1440,900 L1440,560
            Q1415,542 1400,526 Q1385,510 1368,526 Q1352,542 1336,520 Q1320,498 1304,520
            Q1288,540 1272,516 Q1256,492 1240,516 Q1224,538 1207,512 Q1190,486 1173,512
            Q1156,536 1139,508 Q1122,480 1105,508 Q1088,534 1071,504 Q1054,474 1037,504
            Q1020,532 1003,500 Q986,468 969,500 Q952,530 935,496 Q918,462 901,496
            Q884,528 867,492 Q850,456 833,492 Q816,526 799,488 Q782,450 765,488
            Q748,524 731,484 Q714,444 697,484 Q680,522 663,480 Q646,438 629,480
            Q612,520 595,476 Q578,432 561,476 Q544,518 527,472 Q510,426 493,472
            Q476,516 459,468 Q442,420 425,468 Q408,514 391,464 Q374,414 357,464
            Q340,512 323,460 Q306,408 289,460 Q272,510 255,456 Q238,402 221,456
            Q204,508 187,452 Q170,396 153,452 Q136,506 119,448 Q102,390 85,448
            Q68,504 51,444 Q34,384 17,444 Q8,474 0,456Z"
            fill="url(#mtnG)"
            opacity="0.92"
          />

          {/* Mid forest trees */}
          <g fill="url(#midG)" opacity="0.95">
            <path d="M30,670 L46,620 L62,670Z M36,643 L48,608 L62,643Z" />
            <path d="M90,665 L110,608 L130,665Z M98,638 L113,600 L130,638Z" />
            <path d="M160,672 L180,614 L200,672Z M168,644 L182,606 L200,644Z" />
            <path d="M232,668 L254,608 L276,668Z M240,638 L256,600 L276,638Z" />
            <path d="M308,673 L330,612 L352,673Z M316,644 L332,604 L352,644Z" />
            <path d="M384,669 L407,608 L430,669Z M392,640 L409,600 L430,640Z" />
            <path d="M462,675 L484,613 L506,675Z M470,645 L486,605 L506,645Z" />
            <path d="M540,670 L563,609 L586,670Z M548,641 L565,601 L586,641Z" />
            <path d="M620,674 L643,612 L666,674Z M628,645 L645,604 L666,645Z" />
            <path d="M702,669 L726,606 L750,669Z M710,640 L728,598 L750,640Z" />
            <path d="M784,672 L808,610 L832,672Z M792,643 L810,602 L832,643Z" />
            <path d="M866,670 L890,607 L914,670Z M874,641 L892,600 L914,641Z" />
            <path d="M948,674 L972,611 L996,674Z M956,645 L974,603 L996,645Z" />
            <path d="M1030,670 L1054,607 L1078,670Z M1038,641 L1056,599 L1078,641Z" />
            <path d="M1112,673 L1137,609 L1162,673Z M1120,644 L1139,601 L1162,644Z" />
            <path d="M1196,669 L1222,605 L1248,669Z M1204,640 L1224,597 L1248,640Z" />
            <path d="M1280,672 L1306,608 L1332,672Z M1288,643 L1308,600 L1332,643Z" />
            <path d="M1364,670 L1390,606 L1416,670Z M1372,641 L1392,598 L1416,641Z" />
            <rect x="0" y="670" width="1440" height="230" fill="url(#midG)" />
          </g>

          {/* Front trees */}
          <g fill="url(#frtG)">
            <path d="M-25,900 L-25,490 Q-12,465 4,440 Q16,418 28,400 Q40,382 52,400 Q64,418 72,440 Q82,465 86,490 L86,900Z" />
            <path d="M148,900 L150,575 Q160,548 174,522 Q184,504 196,522 Q208,548 212,575 L214,900Z" />
            <path d="M340,900 L342,545 Q354,516 370,490 Q382,470 394,490 Q408,516 412,545 L414,900Z" />
            <path d="M604,900 L606,460 Q622,428 642,400 Q656,378 672,360 Q686,342 702,360 Q716,378 728,400 Q742,428 750,460 L752,900Z" />
            <path d="M920,900 L922,510 Q936,480 952,454 Q964,434 978,454 Q992,480 998,510 L1000,900Z" />
            <path d="M1150,900 L1152,555 Q1164,526 1180,500 Q1192,480 1205,500 Q1218,526 1222,555 L1224,900Z" />
            <path d="M1360,900 L1362,590 Q1374,562 1388,538 Q1398,520 1410,538 Q1422,562 1426,590 L1440,590 L1440,900Z" />
            {/* Branches */}
            <path d="M26,530 Q-18,518 -35,532" stroke="#0d9488" strokeWidth="7" fill="none" strokeLinecap="round" />
            <path d="M38,580 Q-8,570 -26,584" stroke="#0d9488" strokeWidth="5.5" fill="none" strokeLinecap="round" />
            <path d="M642,498 Q592,485 572,498" stroke="#0f766e" strokeWidth="8" fill="none" strokeLinecap="round" />
            <path d="M710,455 Q762,442 782,456" stroke="#0f766e" strokeWidth="7" fill="none" strokeLinecap="round" />
            <path d="M648,555 Q600,545 580,558" stroke="#0f766e" strokeWidth="6" fill="none" strokeLinecap="round" />
            <path d="M706,530 Q756,520 776,532" stroke="#0f766e" strokeWidth="5.5" fill="none" strokeLinecap="round" />
          </g>

          {/* Very dark foreground */}
          <g fill="url(#drkG)" opacity="0.97">
            <path d="M0,900 L0,800 Q50,762 72,780 Q94,798 118,775 Q148,748 180,772 Q210,795 244,768 Q268,748 294,768 L316,900Z" />
            <path d="M1124,900 L1124,792 Q1162,756 1188,775 Q1216,794 1246,768 Q1276,742 1308,768 Q1348,794 1390,764 L1440,748 L1440,900Z" />
            <path d="M0,865 Q360,835 720,855 Q1080,875 1440,842 L1440,900 L0,900Z" />
          </g>

          {/* Mist at base */}
          <rect x="0" y="690" width="1440" height="210" fill="rgba(13, 148, 136, 0.15)" />
          {/* Light rays */}
          <g opacity="0.06">
            <path d="M700,0 L618,900" stroke="#14b8a6" strokeWidth="90" />
            <path d="M755,0 L826,900" stroke="#5eead4" strokeWidth="55" />
          </g>
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 pt-20">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-teal-300/30
            rounded-full px-4 py-2 mb-6 animate-[fadeUp_0.6s_ease_both]"
        >
          <span className="text-teal-200 text-sm">✦</span>
          <span className="text-sm text-white/90 tracking-wide">
            Bengaluru&apos;s Weekend Escape Specialists
          </span>
        </div>

        {/* Headline */}
        <h1
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 animate-[fadeUp_0.6s_ease_0.1s_both]"
          dangerouslySetInnerHTML={{ __html: headline }}
        />

        {/* Subtext */}
        <p className="text-lg md:text-xl text-teal-100/80 max-w-xl mx-auto mb-8 leading-relaxed animate-[fadeUp_0.6s_ease_0.2s_both]">
          {subtext}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-4 justify-center animate-[fadeUp_0.6s_ease_0.3s_both]">
          <Link
            href="#trips"
            className="btn-primary text-base px-8 py-3 flex items-center gap-2"
          >
            Explore Trips
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <Link
            href="#about"
            className="btn-secondary bg-white/10 backdrop-blur-sm text-white border-teal-400/30 text-base px-8 py-3"
          >
            Our Story
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-[float_6s_ease-in-out_infinite]">
        <div className="w-6 h-10 rounded-full border-2 border-white/40 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-white/60 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}
