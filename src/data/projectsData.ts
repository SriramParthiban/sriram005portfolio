import { Zap, BarChart3, Database, Mail, type LucideIcon } from "lucide-react";
import dentbooksProof from "@/assets/dentbooks-email-proof.png";
import multichannelDashboard from "@/assets/multichannel-dashboard.png";
import kpiDashboard from "@/assets/kpi-tracking-dashboard.png";
import dataIntegrationWorkflow from "@/assets/data-integration-workflow.png";
import ghlWorkflowOverview from "@/assets/ghl-workflow-overview.png";
import ghlWorkflowBranches from "@/assets/ghl-workflow-branches.png";
import ghlEmailCompose from "@/assets/ghl-email-compose.png";
import ghlPipelineStages from "@/assets/ghl-pipeline-stages.png";

export interface ProjectData {
  slug: string;
  title: string;
  fullTitle: string;
  description: string;
  metrics: string[];
  tech: string[];
  icon: LucideIcon;
  color: string;
  proofImage: string;
  proofLabel: string;
  extraImages: { src: string; label: string }[];
  // Case study fields
  problemStatement: string;
  purpose: string;
  implementation: string[];
  impact: {
    headline: string;
    details: string[];
  };
  useCases: string[];
  improvements: string[];
}

export const projects: ProjectData[] = [
  {
    slug: "multi-channel-automation",
    title: "Multi-Channel Automation",
    fullTitle: "Multi-Channel Customer Requirements Automation Platform",
    description: "AI-powered discovery and qualification system automating customer requirements gathering across voice, chat, and SMS channels. Built using Lovable.",
    metrics: ["Reduced documentation time by 70%", "99% data accuracy", "1,000+ interactions/day", "Real-time CRM sync"],
    tech: ["AI Agents", "n8n", "REST APIs", "CRM Integration", "NLP", "Lovable"],
    icon: Zap,
    color: "from-primary to-primary/60",
    proofImage: multichannelDashboard,
    proofLabel: "✅ Live Dashboard — Final Output",
    extraImages: [],
    // Case study content
    problemStatement: "Customer service teams were spending excessive time manually documenting customer requirements across multiple communication channels. This led to inconsistent data capture, delayed response times, and a fragmented customer experience. The challenge was to create a unified system that could intelligently gather, validate, and sync customer data in real-time.",
    purpose: "To build an intelligent automation platform that eliminates manual data entry, ensures consistent customer experience across all channels, and provides real-time visibility into customer interactions. The goal was to free up human agents to focus on high-value conversations while letting AI handle routine qualification tasks.",
    implementation: [
      "Designed conversational AI flows using natural language processing to understand customer intent across voice, chat, and SMS channels",
      "Built n8n workflows to orchestrate data flow between channels and the CRM system",
      "Implemented REST API integrations for real-time data synchronization",
      "Created validation rules to ensure 99% data accuracy before CRM entry",
      "Developed a Lovable-powered dashboard for real-time monitoring and analytics",
      "Set up automated escalation triggers for complex queries requiring human intervention"
    ],
    impact: {
      headline: "70% Reduction in Documentation Time",
      details: [
        "Documentation time reduced from 15 minutes to 4 minutes per interaction",
        "Processing capacity increased to 1,000+ interactions daily",
        "Data accuracy improved to 99% with automated validation",
        "Customer wait times reduced by 45%",
        "Agent productivity increased by 3x on high-value tasks"
      ]
    },
    useCases: [
      "New customer onboarding — AI collects requirements and creates CRM records automatically",
      "Support ticket creation — Customers describe issues via any channel, system creates structured tickets",
      "Lead qualification — Automated scoring and routing based on conversation analysis",
      "Appointment scheduling — Natural language booking integrated with calendar systems"
    ],
    improvements: [
      "Add sentiment analysis to prioritize frustrated customers",
      "Implement predictive routing based on customer history",
      "Expand to WhatsApp and social media channels",
      "Build customer-facing self-service portal with conversation history"
    ]
  },
  {
    slug: "kpi-tracking-engine",
    title: "KPI Tracking Engine",
    fullTitle: "Automated KPI Tracking & Call Optimization Engine",
    description: "Real-time performance monitoring system with automated anomaly detection and call quality optimization.",
    metrics: ["Call completion: 67% → 97%", "Invalid leads reduced by 90%", "15+ hours/week saved", "Real-time dashboards"],
    tech: ["Python", "SQL", "Power BI", "Automation", "Analytics"],
    icon: BarChart3,
    color: "from-accent to-accent/60",
    proofImage: kpiDashboard,
    proofLabel: "✅ Live Dashboard — Call Center Performance",
    extraImages: [],
    // Case study content
    problemStatement: "Call center operations were plagued by low completion rates (67%), high invalid lead percentages, and lack of real-time visibility into agent performance. Manual reporting consumed 15+ hours weekly, and anomalies in call quality were only discovered days after they occurred, making corrective action reactive rather than proactive.",
    purpose: "To create an automated performance monitoring system that provides real-time insights, automatically detects anomalies, and enables data-driven optimization of call center operations. The goal was to transform reporting from a manual burden into an automated intelligence layer.",
    implementation: [
      "Built Python ETL pipelines to extract call data from multiple telephony systems",
      "Designed SQL data models optimized for real-time analytics queries",
      "Created Power BI dashboards with drill-down capabilities for each KPI",
      "Implemented anomaly detection algorithms to flag unusual patterns",
      "Set up automated alerts via email and Slack for threshold breaches",
      "Developed agent scorecards with historical trend analysis"
    ],
    impact: {
      headline: "Call Completion Rate: 67% → 97%",
      details: [
        "Call completion rate improved from 67% to 97%",
        "Invalid leads reduced by 90% through better qualification",
        "15+ hours per week saved on manual reporting",
        "Anomaly detection time reduced from days to minutes",
        "Cost per acquisition reduced by 35%"
      ]
    },
    useCases: [
      "Daily performance standup — Team leads use dashboards to review yesterday's metrics",
      "Real-time floor management — Supervisors monitor live call quality",
      "Executive reporting — Automated weekly/monthly reports to leadership",
      "Agent coaching — Individual performance trends identify training opportunities"
    ],
    improvements: [
      "Add predictive modeling for call volume forecasting",
      "Implement speech analytics for call quality scoring",
      "Build mobile app for on-the-go performance monitoring",
      "Create gamification features to boost agent engagement"
    ]
  },
  {
    slug: "data-integration-system",
    title: "Data Integration",
    fullTitle: "Intelligent Data Integration System",
    description: "End-to-end data pipeline collecting via GoHighLevel and n8n webhooks, validating and syncing to monday.com with intelligent routing and real-time alerting.",
    metrics: ["Errors reduced by 80%", "Improved SLA compliance", "Real-time alerting", "Zero-touch processing"],
    tech: ["n8n", "monday.com", "GoHighLevel", "Webhooks", "Data Validation", "ETL"],
    icon: Database,
    color: "from-primary to-accent",
    proofImage: dataIntegrationWorkflow,
    proofLabel: "✅ Live Workflow — n8n Automation Pipeline",
    extraImages: [],
    // Case study content
    problemStatement: "Data was siloed across multiple systems — GoHighLevel for CRM, monday.com for project management, and various other tools. Manual data transfer between systems caused 80% of errors, delayed project kickoffs, and made SLA tracking nearly impossible. Teams spent hours copying data between platforms.",
    purpose: "To build a unified data integration layer that automatically syncs data between all business systems, validates data integrity, routes information intelligently, and provides real-time visibility into data flow status. The goal was to achieve zero-touch data processing.",
    implementation: [
      "Configured GoHighLevel webhooks to trigger on key events (new lead, status change, etc.)",
      "Built n8n workflows to receive, transform, and route data between systems",
      "Implemented multi-layer data validation with error handling and retry logic",
      "Created intelligent routing rules based on data attributes",
      "Set up monday.com boards with automated item creation and updates",
      "Developed real-time alerting for failed syncs or validation errors"
    ],
    impact: {
      headline: "80% Reduction in Data Errors",
      details: [
        "Data errors reduced by 80% through automated validation",
        "SLA compliance improved from 72% to 98%",
        "Project kickoff time reduced from 2 days to 2 hours",
        "Zero manual data entry required for standard workflows",
        "Real-time visibility into data flow across all systems"
      ]
    },
    useCases: [
      "New deal closed — Automatically creates monday.com project with all customer details",
      "Lead status update — Syncs changes across CRM, PM tool, and notification systems",
      "Escalation triggers — Flags SLA breaches and routes to appropriate team",
      "Reporting consolidation — Pulls data from multiple sources for unified dashboards"
    ],
    improvements: [
      "Add machine learning for data quality prediction",
      "Implement bi-directional sync for all connected systems",
      "Build data lineage tracking for compliance",
      "Create self-healing workflows that auto-resolve common errors"
    ]
  },
  {
    slug: "email-automation",
    title: "Email Automation",
    fullTitle: "GoHighLevel Email Automation Workflow",
    description: "Automated lead nurturing pipeline that triggers personalized email sequences when new opportunities or form submissions arrive.",
    metrics: ["Instant lead response time", "Automated booking link delivery", "Trigger-based email sequences", "Zero manual follow-up needed"],
    tech: ["GoHighLevel", "Email Automation", "Workflows", "Lead Nurturing", "CRM"],
    icon: Mail,
    color: "from-accent to-primary",
    proofImage: dentbooksProof,
    proofLabel: "✅ Live Output — Automated Email Delivered",
    extraImages: [
      { src: ghlWorkflowOverview, label: "Full Workflow Overview" },
      { src: ghlWorkflowBranches, label: "Condition-Based Branching Logic" },
      { src: ghlEmailCompose, label: "Personalized Email Template" },
      { src: ghlPipelineStages, label: "Pipeline Stage Management" },
    ],
    // Case study content
    problemStatement: "Leads were going cold due to slow response times — sometimes taking 24+ hours for initial contact. Manual follow-up was inconsistent, and sales reps spent significant time on repetitive email tasks instead of closing deals. There was no systematic approach to lead nurturing.",
    purpose: "To create an automated email nurturing system that responds instantly to new leads, delivers personalized content based on their interests, and systematically moves prospects through the sales pipeline without manual intervention. The goal was to achieve instant response times and consistent follow-up.",
    implementation: [
      "Designed multi-branch workflow in GoHighLevel triggered by form submissions and opportunity creation",
      "Created conditional logic based on lead source, interest area, and engagement level",
      "Built personalized email templates with dynamic content insertion",
      "Implemented automated booking link delivery for qualified leads",
      "Set up pipeline stage automation to track prospect progression",
      "Created re-engagement sequences for leads that go dormant"
    ],
    impact: {
      headline: "Instant Lead Response Time",
      details: [
        "Lead response time reduced from 24+ hours to under 2 minutes",
        "Booking rate increased by 40% with automated scheduling links",
        "Sales reps saved 10+ hours weekly on manual follow-up",
        "Lead-to-opportunity conversion improved by 25%",
        "100% of leads now receive consistent nurturing sequence"
      ]
    },
    useCases: [
      "New lead capture — Instant welcome email with relevant resources",
      "Meeting booking — Automated confirmation and reminder sequences",
      "Quote follow-up — Timed check-ins after sending proposals",
      "Dormant lead revival — Re-engagement campaigns for cold leads"
    ],
    improvements: [
      "Add AI-powered send time optimization",
      "Implement A/B testing for subject lines and content",
      "Build SMS integration for multi-channel nurturing",
      "Create lead scoring to prioritize hot prospects"
    ]
  }
];
