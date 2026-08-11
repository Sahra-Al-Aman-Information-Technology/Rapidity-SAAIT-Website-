/**
 * RAPIDITY — Interactive Experience Engine
 * Your Services. One Simple Platform.
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileNav();
  initPersonaToggle();
  initHeroWidgetDemo();
  initJourneyStepper();
  initContactModal();
  initBackToTop();
  initKeyboardNav();
  initScrollReveal();
});

/**
 * 1. Sticky Navigation & Scroll Spy
 */
function initStickyHeader() {
  const header = document.getElementById('header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    let currentSectionId = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
}

/**
 * 2. Mobile Navigation Toggle
 */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobileMenuToggle');
  const mainNav = document.getElementById('mainNav');
  const navOverlay = document.getElementById('navOverlay');

  if (!toggleBtn || !mainNav) return;

  function openMenu() {
    toggleBtn.setAttribute('aria-expanded', 'true');
    mainNav.classList.add('mobile-open');
    if (navOverlay) navOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    toggleBtn.setAttribute('aria-expanded', 'false');
    mainNav.classList.remove('mobile-open');
    if (navOverlay) navOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  toggleBtn.addEventListener('click', () => {
    const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    if (isExpanded) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  if (navOverlay) {
    navOverlay.addEventListener('click', closeMenu);
  }

  const clickableItems = mainNav.querySelectorAll('.nav-link, .btn, .nav-provider-link');
  clickableItems.forEach(item => {
    item.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mainNav.classList.contains('mobile-open')) {
      closeMenu();
      toggleBtn.focus();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 1180 && mainNav.classList.contains('mobile-open')) {
      closeMenu();
    }
  });
}

/**
 * 3. Dual-Persona Bento Hub Switcher (Customers vs Service Providers)
 */
function initPersonaToggle() {
  const customerBtn = document.getElementById('personaCustomerBtn');
  const providerBtn = document.getElementById('personaProviderBtn');
  const customerView = document.getElementById('bentoCustomerView');
  const providerView = document.getElementById('bentoProviderView');

  if (!customerBtn || !providerBtn || !customerView || !providerView) return;

  function setPersona(persona) {
    if (persona === 'customer') {
      customerBtn.classList.add('active');
      customerBtn.setAttribute('aria-selected', 'true');
      providerBtn.classList.remove('active');
      providerBtn.setAttribute('aria-selected', 'false');

      customerView.classList.add('active');
      providerView.classList.remove('active');
    } else {
      providerBtn.classList.add('active');
      providerBtn.setAttribute('aria-selected', 'true');
      customerBtn.classList.remove('active');
      customerBtn.setAttribute('aria-selected', 'false');

      providerView.classList.add('active');
      customerView.classList.remove('active');
    }
  }

  customerBtn.addEventListener('click', () => setPersona('customer'));
  providerBtn.addEventListener('click', () => setPersona('provider'));
}

/**
 * 4. Hero Live Interactive Widget Demo Controls
 */
function initHeroWidgetDemo() {
  const approveBtn = document.getElementById('heroDemoApproveBtn');
  const statusPill = document.getElementById('heroStatusPill');
  const statusText = document.getElementById('heroStatusText');
  const approvalCard = document.getElementById('heroApprovalCard');
  const approvalBadge = document.getElementById('heroApprovalBadge');
  const approvalDesc = document.getElementById('heroApprovalDesc');

  if (!approveBtn || !statusPill || !statusText) return;

  approveBtn.addEventListener('click', () => {
    statusPill.className = 'service-status-pill status-approved';
    statusText.textContent = 'Verified Approved';

    if (approvalCard) {
      approvalCard.style.background = 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(13, 148, 136, 0.25) 100%)';
      approvalCard.style.borderColor = 'rgba(52, 211, 153, 0.4)';
    }

    if (approvalBadge) {
      approvalBadge.textContent = 'Scope Approved';
      approvalBadge.style.color = '#34D399';
    }

    if (approvalDesc) {
      approvalDesc.textContent = 'Air Filter Replacement (HEPA Grade) — Authorized';
    }

    approveBtn.disabled = true;
    approveBtn.textContent = 'Approved ✓';
    showToast('Scope modification digitally authorized & timestamped!');
  });
}

/**
 * 5. 9-Step Journey Stepper Interaction with Dynamic Spotlight Hero & Auto-Play
 */
function initJourneyStepper() {
  const STEPS_DATA = {
    1: {
      num: "01",
      title: "Discover",
      phase: "DISCOVERY PHASE",
      role: "Customer Action",
      roleClass: "customer-pill",
      desc: "Browse curated service categories or search specific skills to identify qualified, verified service providers for your exact needs.",
      deliverable: "Verified provider credentials & instant skill filter match",
      icon: `<circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="2"/><path d="M20 20l-4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`,
      meta: [
        { key: "Status:", val: "Active Exploration", valClass: "val-active" },
        { key: "Verification:", val: "100% Background Checked" },
        { key: "Match Speed:", val: "< 15 Minutes" }
      ],
      nextStepLabel: "Next Step: Request"
    },
    2: {
      num: "02",
      title: "Request",
      phase: "INTAKE PHASE",
      role: "Customer Action",
      roleClass: "customer-pill",
      desc: "Submit your detailed service request with specific needs, preferred timelines, photos, and location details in one simple form.",
      deliverable: "Structured digital intake form & requirement specifications",
      icon: `<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" stroke-width="2"/><path d="M14 2v6h6M9 13h6M9 17h4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`,
      meta: [
        { key: "Form Status:", val: "Draft & Submit", valClass: "val-active" },
        { key: "Detail Level:", val: "High Resolution Specs" },
        { key: "Location:", val: "GPS Location Synced" }
      ],
      nextStepLabel: "Next Step: Connect"
    },
    3: {
      num: "03",
      title: "Connect",
      phase: "MATCHING PHASE",
      role: "Provider Response",
      roleClass: "provider-pill",
      desc: "The matched service provider reviews your request details, confirms skill availability, and accepts the engagement.",
      deliverable: "Confirmed provider assignment & scope acceptance",
      icon: `<path d="M16 11V7a4 4 0 0 0-8 0v4M5 9h14v11H5z" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="15" r="1.5" fill="currentColor"/>`,
      meta: [
        { key: "Provider Status:", val: "Assigned & Verified", valClass: "val-active" },
        { key: "SLA Guarantee:", val: "Guaranteed Acceptance" },
        { key: "Channel:", val: "Encrypted Direct Chat" }
      ],
      nextStepLabel: "Next Step: Schedule"
    },
    4: {
      num: "04",
      title: "Schedule",
      phase: "LOGISTICS PHASE",
      role: "Collaborative",
      roleClass: "collaborative-pill",
      desc: "Select convenient booking slots or coordinate on-site arrival times with automated calendar synchronization.",
      deliverable: "Lock-in booking slot & calendar event dispatch",
      icon: `<rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" stroke-width="2"/><path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" stroke-width="2"/><path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`,
      meta: [
        { key: "Slot Confirmed:", val: "Calendar Synced", valClass: "val-active" },
        { key: "Reminders:", val: "Automated SMS / Push" },
        { key: "Flexibility:", val: "Reschedule Window Active" }
      ],
      nextStepLabel: "Next Step: Execute"
    },
    5: {
      num: "05",
      title: "Execute",
      phase: "SERVICE PHASE",
      role: "Provider Action",
      roleClass: "provider-pill",
      desc: "The service professional arrives on time and performs the requested service according to verified quality standards.",
      deliverable: "Active job execution & real-time work log",
      icon: `<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.9 6.91a2.12 2.12 0 0 1-3-3l6.91-6.9a6 6 0 0 1 7.94-7.94l-3.76 3.76z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`,
      meta: [
        { key: "Service Status:", val: "In Execution", valClass: "val-active" },
        { key: "Arrival Check-in:", val: "Verified GPS On-Site" },
        { key: "Standards:", val: "Verified Quality Protocol" }
      ],
      nextStepLabel: "Next Step: Update"
    },
    6: {
      num: "06",
      title: "Update",
      phase: "VISIBILITY PHASE",
      role: "Live Sync",
      roleClass: "collaborative-pill",
      desc: "Real-time progress notifications, photo evidence, and milestone logs keep customers completely informed as work progresses.",
      deliverable: "Photo updates, milestone tracking & instant messaging",
      icon: `<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="currentColor" stroke-width="2"/><path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="currentColor" stroke-width="2"/>`,
      meta: [
        { key: "Milestone Log:", val: "Live Timestamped", valClass: "val-active" },
        { key: "Media Attached:", val: "High-Res Photos & Notes" },
        { key: "Audit Trail:", val: "100% Transparent Log" }
      ],
      nextStepLabel: "Next Step: Approve"
    },
    7: {
      num: "07",
      title: "Approve",
      phase: "VERIFICATION PHASE",
      role: "Customer Action",
      roleClass: "customer-pill",
      desc: "The customer inspects completed work, reviews itemized cost breakdowns, and signs off on any approved scope variations.",
      deliverable: "Digital inspection sign-off & itemized cost audit",
      icon: `<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" stroke-width="2"/><path d="M9 12l2 2 4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`,
      meta: [
        { key: "Inspection:", val: "Completed & Verified", valClass: "val-active" },
        { key: "Cost Assurance:", val: "Zero Hidden Fees" },
        { key: "Authorization:", val: "Digital Customer Sign-Off" }
      ],
      nextStepLabel: "Next Step: Complete"
    },
    8: {
      num: "08",
      title: "Complete",
      phase: "SETTLEMENT PHASE",
      role: "Automated Settlement",
      roleClass: "collaborative-pill",
      desc: "Final digital sign-off is recorded, secure cashless payment is processed, and formal tax invoices are automatically generated.",
      deliverable: "Immutable digital transaction record & automated PDF invoice",
      icon: `<rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" stroke-width="2"/><path d="M2 10h20M6 15h4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`,
      meta: [
        { key: "Settlement:", val: "Fully Paid & Cleared", valClass: "val-active" },
        { key: "Security:", val: "256-Bit Encrypted" },
        { key: "Tax Invoice:", val: "Archived & Exportable" }
      ],
      nextStepLabel: "Next Step: Review"
    },
    9: {
      num: "09",
      title: "Review",
      phase: "REPUTATION PHASE",
      role: "Mutual Feedback",
      roleClass: "customer-pill",
      desc: "Both customer and provider share authentic ratings and feedback, building community trust and permanent record history.",
      deliverable: "Verified 5-star rating & permanent service archive log",
      icon: `<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`,
      meta: [
        { key: "Community Trust:", val: "Verified Rating Recorded", valClass: "val-active" },
        { key: "Service Archive:", val: "Permanently Preserved" },
        { key: "Re-booking:", val: "1-Click Preferred Pro" }
      ],
      nextStepLabel: "Restart Journey (Step 1)"
    }
  };

  const timelineNodes = document.querySelectorAll('.timeline-node');
  const progressFill = document.getElementById('journeyProgressFill');
  const statusIndicator = document.getElementById('journeyStatusIndicator');
  
  const stepBadge = document.getElementById('spotlightStepBadge');
  const phaseTag = document.getElementById('spotlightPhaseTag');
  const rolePill = document.getElementById('spotlightRolePill');
  const titleEl = document.getElementById('spotlightTitle');
  const descEl = document.getElementById('spotlightDesc');
  const deliverableEl = document.getElementById('spotlightDeliverable');
  const prevBtn = document.getElementById('prevJourneyStepBtn');
  const nextBtn = document.getElementById('nextJourneyStepBtn');
  const mainIcon = document.getElementById('spotlightMainIcon');
  const metaList = document.getElementById('spotlightMetaList');
  const autoPlayBtn = document.getElementById('autoPlayJourneyBtn');
  const autoPlayBtnText = document.getElementById('autoPlayBtnText');

  let currentStep = 1;
  let autoPlayTimer = null;

  function setActiveStep(stepNum) {
    currentStep = parseInt(stepNum, 10);
    const data = STEPS_DATA[currentStep];
    if (!data) return;

    if (progressFill) {
      const percentage = ((currentStep - 1) / 8) * 100;
      progressFill.style.width = `${percentage}%`;
    }

    timelineNodes.forEach(node => {
      const step = parseInt(node.getAttribute('data-step'), 10);
      const isCurrent = step === currentStep;
      const isCompleted = step < currentStep;

      node.classList.toggle('active', isCurrent);
      node.classList.toggle('completed', isCompleted);
      node.setAttribute('aria-selected', String(isCurrent));
    });

    if (statusIndicator) {
      statusIndicator.innerHTML = `Step <strong>${currentStep}</strong> of 9: <strong>${data.phase}</strong>`;
    }

    if (stepBadge) stepBadge.textContent = `Step ${data.num}`;
    if (phaseTag) phaseTag.textContent = data.phase;
    if (rolePill) {
      rolePill.textContent = data.role;
      rolePill.className = `spotlight-role-pill ${data.roleClass}`;
    }
    if (titleEl) titleEl.textContent = data.title;
    if (descEl) descEl.textContent = data.desc;
    if (deliverableEl) {
      const span = deliverableEl.querySelector('span');
      if (span) span.textContent = data.deliverable;
    }
    if (mainIcon) mainIcon.innerHTML = data.icon;

    if (metaList && data.meta) {
      metaList.innerHTML = data.meta.map(m => `
        <div class="meta-row">
          <span class="meta-key">${m.key}</span>
          <span class="meta-val ${m.valClass || ''}">${m.val}</span>
        </div>
      `).join('');
    }

    if (prevBtn) {
      prevBtn.disabled = (currentStep === 1);
    }
    if (nextBtn) {
      const nextSpan = nextBtn.querySelector('span');
      if (nextSpan) nextSpan.textContent = data.nextStepLabel;
    }
  }

  timelineNodes.forEach(node => {
    node.addEventListener('click', () => {
      stopAutoPlay();
      const step = node.getAttribute('data-step');
      setActiveStep(step);
    });
  });

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      stopAutoPlay();
      if (currentStep > 1) {
        setActiveStep(currentStep - 1);
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      stopAutoPlay();
      const nextStep = (currentStep === 9) ? 1 : currentStep + 1;
      setActiveStep(nextStep);
    });
  }

  function startAutoPlay() {
    if (autoPlayTimer) clearInterval(autoPlayTimer);
    autoPlayTimer = setInterval(() => {
      const nextStep = (currentStep === 9) ? 1 : currentStep + 1;
      setActiveStep(nextStep);
    }, 3200);

    if (autoPlayBtn) {
      autoPlayBtn.classList.add('playing');
      const playIcon = autoPlayBtn.querySelector('.play-icon');
      const pauseIcon = autoPlayBtn.querySelector('.pause-icon');
      if (playIcon) playIcon.style.display = 'none';
      if (pauseIcon) pauseIcon.style.display = 'inline-block';
      if (autoPlayBtnText) autoPlayBtnText.textContent = 'Pause Journey';
    }
  }

  function stopAutoPlay() {
    if (autoPlayTimer) {
      clearInterval(autoPlayTimer);
      autoPlayTimer = null;
    }
    if (autoPlayBtn) {
      autoPlayBtn.classList.remove('playing');
      const playIcon = autoPlayBtn.querySelector('.play-icon');
      const pauseIcon = autoPlayBtn.querySelector('.pause-icon');
      if (playIcon) playIcon.style.display = 'inline-block';
      if (pauseIcon) pauseIcon.style.display = 'none';
      if (autoPlayBtnText) autoPlayBtnText.textContent = 'Auto Play Journey';
    }
  }

  if (autoPlayBtn) {
    autoPlayBtn.addEventListener('click', () => {
      if (autoPlayTimer) {
        stopAutoPlay();
      } else {
        startAutoPlay();
      }
    });
  }

  setActiveStep(1);
}

/**
 * 6. Contact, Explore Services & Request Demo Modal Dialog
 */
function initContactModal() {
  const modal = document.getElementById('contactModal');
  const providerBtns = document.querySelectorAll('#heroProviderBtn, #navProviderBtn, #mobileNavProviderBtn, #finalPartnerBtn, #tierProviderBtn, #tierEnterpriseBtn, #finalContactBtn, a[href*="provider"]');
  const customerBtns = document.querySelectorAll('#heroExploreBtn, #navExploreBtn, #mobileNavExploreBtn, #finalGetStartedBtn, #tierCustomerBtn, a[href*="customer"]');
  const closeBtn = document.getElementById('modalCloseBtn');
  const cancelBtn = document.getElementById('modalCancelBtn');
  const doneBtn = document.getElementById('modalDoneBtn');
  const contactForm = document.getElementById('contactForm');
  const successState = document.getElementById('modalSuccess');
  const contactRole = document.getElementById('contactRole');
  const modalTitle = document.getElementById('modalTitle');
  const modalSub = document.getElementById('modalSub');

  if (!modal) return;

  function openModal(type) {
    if (contactForm) contactForm.style.display = 'flex';
    if (successState) successState.style.display = 'none';

    if (type === 'customer') {
      if (contactRole) contactRole.value = 'customer';
      if (modalTitle) modalTitle.textContent = 'Explore Rapidity Services & Access';
      if (modalSub) modalSub.textContent = 'Request instant access or submit your service requirements to explore verified providers.';
    } else if (type === 'enterprise') {
      if (contactRole) contactRole.value = 'enterprise';
      if (modalTitle) modalTitle.textContent = 'Request Enterprise & Fleet Demo';
      if (modalSub) modalSub.textContent = 'Schedule a customized demo for multi-location businesses, franchises, or enterprise fleets.';
    } else {
      if (contactRole) contactRole.value = 'provider';
      if (modalTitle) modalTitle.textContent = 'Request a Demo & Partner Inquiry';
      if (modalSub) modalSub.textContent = 'Connect with our team to schedule a demo or onboard your service business on Rapidity.';
    }

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    const firstInput = document.getElementById('contactName');
    if (firstInput) firstInput.focus();
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  providerBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const type = (btn.id === 'tierEnterpriseBtn') ? 'enterprise' : 'provider';
      openModal(type);
    });
  });

  customerBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal('customer');
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (cancelBtn) cancelBtn.addEventListener('click', closeModal);
  if (doneBtn) doneBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = document.getElementById('modalSubmitBtn');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.querySelector('span').textContent = 'Submitting...';
      }

      const payload = {
        site_source: "Rapidity",
        name: (document.getElementById('contactName')?.value || '').trim(),
        email: (document.getElementById('contactEmail')?.value || '').trim(),
        phone: (document.getElementById('contactPhone')?.value || '').trim(),
        company_name: (document.getElementById('contactCompany')?.value || '').trim(),
        role: document.getElementById('contactRole')?.value || '',
        subject: `Rapidity Inquiry: ${document.getElementById('contactRole')?.value || 'Demo'}`,
        message: (document.getElementById('contactMessage')?.value || '').trim(),
        source_page: "/#contactModal"
      };

      fetch('http://localhost:5000/api/public/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload)
      })
      .then(res => res.json())
      .then(data => {
        contactForm.style.display = 'none';
        if (successState) successState.style.display = 'block';
        showToast('Demo Request submitted successfully to CMS!');
      })
      .catch(err => {
        console.error('CMS submission error:', err);
        contactForm.style.display = 'none';
        if (successState) successState.style.display = 'block';
        showToast('Demo Request received!');
      })
      .finally(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.querySelector('span').textContent = 'Submit Demo Request';
        }
      });
    });
  }
}

/**
 * 7. Back to Top Button
 */
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }, { passive: true });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/**
 * 8. Keyboard Accessibility Helper
 */
function initKeyboardNav() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      document.body.classList.add('user-is-tabbing');
    }
  });
}

/**
 * 9. Scroll Reveal Animations
 */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if (!('IntersectionObserver' in window)) {
    revealElements.forEach(el => el.classList.add('revealed'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealElements.forEach(el => observer.observe(el));
}

/**
 * Toast Notification Utility Helper
 */
function showToast(message) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>✓</span> <span>${message}</span>`;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}
