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
  // Enhanced case study fields
  challenges: { title: string; description: string }[];
  architectureSteps: { label: string; detail: string }[];
  timeline: { phase: string; duration: string; description: string }[];
  beforeAfter: { metric: string; before: string; after: string }[];
  keyTakeaway: string;
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
    ],
    challenges: [
      { title: "Channel Fragmentation", description: "Customer data was scattered across voice, chat, and SMS with no unified view, causing duplicate records and missed context." },
      { title: "Unstructured Data Parsing", description: "Voice and free-text inputs needed advanced NLP to extract structured requirements from messy, conversational language." },
      { title: "Real-Time Sync Latency", description: "CRM updates needed to happen within seconds across all channels to prevent agents from working with stale data." },
      { title: "Escalation Logic", description: "Determining when AI should hand off to a human agent required nuanced confidence scoring and intent classification." }
    ],
    architectureSteps: [
      { label: "Customer Input", detail: "Voice, Chat, or SMS channel captures raw customer interaction" },
      { label: "NLP Engine", detail: "Natural language processing extracts intent, entities, and structured requirements" },
      { label: "n8n Orchestrator", detail: "Workflow engine routes data, applies validation rules, and triggers appropriate actions" },
      { label: "Data Validation", detail: "Multi-layer validation ensures 99% accuracy before any CRM write" },
      { label: "CRM Sync", detail: "Real-time bidirectional sync updates customer records across all systems" },
      { label: "Dashboard & Alerts", detail: "Lovable-powered dashboard provides live monitoring and anomaly alerts" }
    ],
    timeline: [
      { phase: "Discovery & Design", duration: "2 weeks", description: "Mapped existing workflows, identified pain points, designed AI conversation flows and data models" },
      { phase: "Core Development", duration: "4 weeks", description: "Built NLP engine, n8n workflows, REST API integrations, and validation layer" },
      { phase: "Dashboard & Monitoring", duration: "2 weeks", description: "Created real-time Lovable dashboard with analytics, alerting, and agent performance views" },
      { phase: "Testing & Optimization", duration: "2 weeks", description: "Load testing at 1,000+ interactions/day, fine-tuned NLP accuracy, optimized sync latency" }
    ],
    beforeAfter: [
      { metric: "Documentation Time", before: "15 min/interaction", after: "4 min/interaction" },
      { metric: "Data Accuracy", before: "~78%", after: "99%" },
      { metric: "Daily Capacity", before: "~300 interactions", after: "1,000+ interactions" },
      { metric: "Customer Wait Time", before: "8+ minutes", after: "< 4 minutes" },
      { metric: "Agent Utilization", before: "40% on admin tasks", after: "85% on high-value work" }
    ],
    keyTakeaway: "By combining AI-driven NLP with intelligent workflow orchestration, we eliminated 70% of manual documentation work while simultaneously improving data quality to 99%. The key insight was that automation isn't about replacing humans — it's about freeing them to do what they do best."
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
    ],
    challenges: [
      { title: "Data Silos", description: "Call data was spread across 3 different telephony systems with incompatible formats and no shared identifiers." },
      { title: "Delayed Reporting", description: "Reports were generated manually in Excel, creating a 48-hour lag between events and visibility." },
      { title: "Alert Fatigue", description: "Previous alert systems generated too many false positives, causing teams to ignore critical notifications." },
      { title: "Agent Buy-In", description: "Agents initially resisted real-time monitoring, fearing micromanagement rather than seeing it as a coaching tool." }
    ],
    architectureSteps: [
      { label: "Telephony Systems", detail: "Multiple call platforms stream raw call data via APIs and webhooks" },
      { label: "Python ETL", detail: "Custom pipelines extract, transform, and standardize data from all sources" },
      { label: "SQL Data Warehouse", detail: "Optimized schemas store historical and real-time call metrics" },
      { label: "Anomaly Detection", detail: "Statistical algorithms flag deviations from baseline performance" },
      { label: "Power BI Dashboards", detail: "Interactive visualizations with drill-down by agent, team, and time period" },
      { label: "Alert Engine", detail: "Smart notifications via email and Slack with cooldown periods to prevent fatigue" }
    ],
    timeline: [
      { phase: "Data Audit & Planning", duration: "1 week", description: "Audited all telephony systems, mapped data schemas, identified key KPIs with stakeholders" },
      { phase: "ETL Pipeline Development", duration: "3 weeks", description: "Built Python extraction scripts, data transformation logic, and SQL warehouse schema" },
      { phase: "Dashboard Creation", duration: "2 weeks", description: "Designed and built Power BI dashboards with real-time refresh and drill-down capabilities" },
      { phase: "Anomaly & Alerting System", duration: "2 weeks", description: "Implemented statistical anomaly detection and smart alert routing with threshold tuning" }
    ],
    beforeAfter: [
      { metric: "Call Completion Rate", before: "67%", after: "97%" },
      { metric: "Invalid Leads", before: "~25% of total", after: "< 3% of total" },
      { metric: "Reporting Time", before: "15+ hours/week", after: "Fully automated" },
      { metric: "Anomaly Detection", before: "2-3 days", after: "< 5 minutes" },
      { metric: "Cost Per Acquisition", before: "Baseline", after: "35% lower" }
    ],
    keyTakeaway: "The biggest win wasn't the dashboards — it was turning data into action. By reducing anomaly detection from days to minutes, we shifted the entire call center from reactive firefighting to proactive optimization, resulting in a 30-point jump in call completion rates."
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
    ],
    challenges: [
      { title: "Webhook Reliability", description: "GoHighLevel webhooks occasionally dropped events under high load, requiring idempotent retry mechanisms." },
      { title: "Schema Mismatches", description: "monday.com and GoHighLevel had fundamentally different data models, requiring complex transformation mappings." },
      { title: "Error Cascades", description: "A single validation failure could block downstream processes, requiring graceful degradation and partial processing." },
      { title: "SLA Tracking Gaps", description: "No existing system tracked SLA timelines end-to-end, so a custom tracking layer had to be built from scratch." }
    ],
    architectureSteps: [
      { label: "GoHighLevel Events", detail: "Webhooks fire on lead creation, status changes, and form submissions" },
      { label: "n8n Receiver", detail: "Webhook nodes catch events, deduplicate, and queue for processing" },
      { label: "Data Transformer", detail: "Maps GoHighLevel fields to monday.com schema with type validation" },
      { label: "Validation Layer", detail: "Multi-rule validation checks data completeness, format, and business rules" },
      { label: "Intelligent Router", detail: "Routes data to correct monday.com board/group based on deal type and priority" },
      { label: "Monitoring & Alerts", detail: "Failed syncs trigger Slack alerts with error context and retry options" }
    ],
    timeline: [
      { phase: "System Mapping", duration: "1 week", description: "Documented all data flows between GoHighLevel, monday.com, and other tools" },
      { phase: "Webhook & Pipeline Setup", duration: "3 weeks", description: "Built n8n workflows, webhook receivers, and transformation logic" },
      { phase: "Validation & Routing", duration: "2 weeks", description: "Implemented validation rules, routing logic, and error handling" },
      { phase: "Monitoring & Go-Live", duration: "1 week", description: "Set up alerting, ran parallel processing validation, and went live" }
    ],
    beforeAfter: [
      { metric: "Data Errors", before: "~20% of entries", after: "< 4% of entries" },
      { metric: "SLA Compliance", before: "72%", after: "98%" },
      { metric: "Project Kickoff", before: "2 days", after: "2 hours" },
      { metric: "Manual Data Entry", before: "5+ hours/day", after: "Zero" },
      { metric: "Error Detection", before: "Next-day review", after: "Real-time alerts" }
    ],
    keyTakeaway: "The secret to reliable data integration isn't just connecting systems — it's building intelligent validation and routing that handles edge cases gracefully. By treating every data point as potentially unreliable, we built a system that's more accurate than any human process."
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
    ],
    challenges: [
      { title: "Lead Response Delay", description: "Average first contact was 24+ hours after submission, by which time prospects had often engaged with competitors." },
      { title: "Inconsistent Follow-Up", description: "Manual follow-up meant some leads got 5 emails while others got zero, with no standardized nurturing cadence." },
      { title: "Personalization at Scale", description: "Each lead needed tailored content based on their source, interest, and engagement — impossible to do manually." },
      { title: "Pipeline Visibility", description: "No clear view of where each lead stood in the nurturing process, making forecasting unreliable." }
    ],
    architectureSteps: [
      { label: "Lead Capture", detail: "Form submissions and opportunity creation events trigger the workflow" },
      { label: "Lead Scoring", detail: "Automatic scoring based on source, engagement signals, and profile completeness" },
      { label: "Branch Logic", detail: "Conditional routing sends leads down personalized email paths" },
      { label: "Email Sequences", detail: "Dynamic templates deliver tailored content with booking links" },
      { label: "Pipeline Automation", detail: "Lead stage updates automatically as they engage with emails" },
      { label: "Re-engagement Loop", detail: "Dormant leads automatically enter revival sequences after inactivity" }
    ],
    timeline: [
      { phase: "Strategy & Mapping", duration: "1 week", description: "Defined nurturing sequences, mapped lead segments, designed email templates" },
      { phase: "Workflow Development", duration: "2 weeks", description: "Built GoHighLevel workflows with branching logic and trigger conditions" },
      { phase: "Email Template Design", duration: "1 week", description: "Created personalized email templates with dynamic fields and booking integration" },
      { phase: "Testing & Launch", duration: "1 week", description: "A/B tested email sequences, validated pipeline automation, launched to production" }
    ],
    beforeAfter: [
      { metric: "First Response Time", before: "24+ hours", after: "< 2 minutes" },
      { metric: "Booking Rate", before: "Baseline", after: "+40% increase" },
      { metric: "Manual Follow-Up", before: "10+ hours/week", after: "Zero" },
      { metric: "Lead Coverage", before: "~60% contacted", after: "100% nurtured" },
      { metric: "Conversion Rate", before: "Baseline", after: "+25% improvement" }
    ],
    keyTakeaway: "Speed wins deals. By reducing lead response time from 24 hours to under 2 minutes, we captured prospects at their peak interest moment. The combination of instant response, personalized content, and systematic follow-up created a predictable revenue engine."
  }
];
