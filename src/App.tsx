import React, { useState } from "react";
import { FileUp, FileText, Loader2 } from "lucide-react";
import OpenAI from "openai";
import { VisualAbstract } from './components/VisualAbstract';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ThemeSelector } from './components/ThemeSelector';
import { PrioritySliders, type PriorityValues } from './components/PrioritySliders';
import { generateVisualAbstract } from './utils/researchProcessor';
import type { VisualAbstractData } from './types/abstract';

const ASSISTANT_ID = "asst_1NZLVbVABOIbObSZWYondAxd";

export default function App() {
  const [loading, setLoading] = useState(false);
  const [abstractData, setAbstractData] = useState<VisualAbstractData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedTheme, setSelectedTheme] = useState('Modern Medical');
  const [file, setFile] = useState<File | null>(null);
  const [summary, setSummary] = useState<string>("");
  const [priorities, setPriorities] = useState<PriorityValues>({
    textual: 33,
    graphical: 33,
    symbolical: 34
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile?.type === "application/pdf") {
      setFile(selectedFile);
      setError(null);
    } else {
      setError("Please upload a PDF file");
      setFile(null);
    }
  };

  const handlePDFSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!file) return;

    setLoading(true);
    setSummary("");
    setError(null);

    try {
      const openai = new OpenAI({
        apiKey: import.meta.env.VITE_OPENAI_API_KEY,
        dangerouslyAllowBrowser: true,
      });

      const fileUpload = await openai.files.create({
        file,
        purpose: "assistants",
      });

      const thread = await openai.beta.threads.create();

      await openai.beta.threads.messages.create(thread.id, {
        role: "user",
        content: `You are an advanced AI specializing in summarizing medical research papers while preserving essential context, statistical integrity, and visual insight potential. Your task is to extract all nodes necessary to reconstruct the entire paper's content in a logically structured, storytelling format. These nodes should allow a secondary API call to dynamically select relevant nodes or backtrack to another node if needed.

Core Summarization Framework:

1. Identify the Paper Type
Classify the research paper into one or more of the following categories:
- Experimental Research
- Observational Studies
- Review Papers
- Theoretical & Conceptual Papers
- Case Studies
- Technical Reports
- Perspective & Opinion Papers
- Protocol Papers
- Data-Driven Papers

2. Extract All Nodes in a Storytelling Format
For each research paper, extract all possible nodes while maintaining a logical story-like sequence that flows from foundational concepts to advanced insights. Each node must:
- Contain all significant findings, including statistical insights.
- Logically connect to previous and subsequent nodes (like "connecting the dots").
- Allow dynamic selection and backtracking in a secondary API call if a node is deemed unnecessary or requires further context.
- Include graphical insight nodes for visual representation (trends, distributions, comparisons, statistical significance).

Type-Specific Story-Based Node Extraction Frameworks

1. Experimental Research (Narrative: "The Discovery Journey")
- Introduction Node: What is the background and why is this research important?
- Problem Node: What specific medical problem is addressed? What gap does it fill?
- Hypothesis Node: What was expected? How was it formulated?
- Study Design Node: What experimental design, techniques, and controls were used? (Include sample size, inclusion/exclusion criteria).
- Methods Node: Detailed methodology, including statistical analysis.
- Data Collection Node: How was data collected?
- Results Node: Key findings (highlight statistical significance, p-values, effect sizes). Identify data points for visualization.
- Unexpected Findings Node: What results deviated from expectations?
- Limitations Node: What constraints affect interpretation?
- Impact Node: Clinical relevance and potential applications.

2. Observational Studies (Narrative: "Seeing the Patterns")
- Research Question Node: What is being studied?
- Data Source Node: Where did the data come from?
- Sample Node: Demographics and characteristics of the dataset.
- Study Design Node: Cohort, case-control, or cross-sectional study.
- Statistical Model Node: What statistical or machine learning models were applied?
- Findings Node: Key relationships, trends, or patterns (odds ratios, hazard ratios, p-values). Identify trends for visualization.
- Bias & Limitation Node: What factors might distort findings?
- Implication Node: How does this impact medical knowledge?

3. Review Papers (Narrative: "The Knowledge Map")
- Context Node: Why is this review necessary?
- Scope Node: What timeframes, studies, or methodologies are included?
- State of Knowledge Node: Summary of key findings from existing literature. Extract data tables for graphical representation.
- Controversies Node: Where do experts disagree?
- Knowledge Gaps Node: What areas remain unclear?
- Future Research Node: What next steps are recommended?

4. Theoretical & Conceptual Papers (Narrative: "Building the Big Idea")
- Existing Framework Node: What models/theories are currently used?
- Weaknesses Node: What are their limitations?
- New Concept Node: What novel framework is introduced?
- Supporting Evidence Node: What justifies this new model?
- Boundary Node: When does this model apply?
- Evolution Node: How does this advance theoretical understanding?

5. Case Studies (Narrative: "A Real-World Story")
- Unique Case Node: Why is this case significant?
- Background Node: Patient demographics, history, and condition.
- Diagnosis Node: What diagnostic steps were taken?
- Treatment Node: What interventions were used?
- Outcome Node: What was the result? Extract relevant biomarkers for visualization.
- Comparison Node: How does this compare to other similar cases?
- Clinical Takeaways Node: Key lessons for practitioners.

6. Technical Reports (Narrative: "Behind the Build")
- Problem Node: What technical challenge needed solving?
- System Design Node: How was the solution developed?
- Implementation Node: How was it built and deployed?
- Performance Metrics Node: How well did it work? (Accuracy, sensitivity, specificity, validation). Identify visualization needs (ROC curves, precision-recall graphs).
- Limitations Node: What constraints exist?
- Optimization Node: How can this be improved?

7. Perspective & Opinion Papers (Narrative: "The Thought Piece")
- Current Landscape Node: What issue or debate is being discussed?
- Argument Node: What new perspective is proposed?
- Supporting Evidence Node: What backs this viewpoint?
- Counterargument Node: What opposing views exist?
- Implication Node: What changes if this perspective is widely accepted?
- Call to Action Node: What should researchers do next?

8. Protocol Papers (Narrative: "The Blueprint")
- Research Question Node: What does this protocol seek to answer?
- Design Node: What study methodology is used?
- Procedure Node: What steps will be followed?
- Statistical Plan Node: How is statistical significance determined?
- Outcome Node: What endpoints will be measured? Identify visualization opportunities.
- Timeline Node: Projected study progression.

9. Data-Driven Papers (Narrative: "The Pattern Finder")
- Dataset Node: What data sources were used?
- Preprocessing Node: How was data cleaned and prepared?
- Model Node: What machine learning or statistical techniques were used?
- Findings Node: What trends emerged? (Include confidence intervals, p-values, model performance). Extract key data for visualization.
- Bias & Reliability Node: How reliable is the data?
- Application Node: How can findings be used in practice?

Output Format
For each research paper, return:
- The identified paper type
- All extracted nodes in sequential, storytelling format
- A brief explanation of each node's relevance
- Statistical Data where relevant (p-values, confidence intervals, effect sizes, sample sizes)
- Logical Flow preserved, ensuring dynamic API selection of nodes
- Nodes flagged for graphical representation (trends, distributions, comparisons, statistical significance visualization)

This structure allows another API call to:
- Select relevant nodes dynamically.
- Backtrack to a previous node for additional context if needed.
- Customize output for different use cases (clinical summaries, presentations, structured data analysis).

Follow these principles strictly to ensure a comprehensive, flexible, and structured summary that can be used dynamically in various applications.`,
        attachments: [{ file_id: fileUpload.id, tools: [{ type: "file_search" }] }]
      });

      const run = await openai.beta.threads.runs.create(thread.id, {
        assistant_id: ASSISTANT_ID,
      });

      let runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);
      while (runStatus.status === "queued" || runStatus.status === "in_progress") {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);

        if (runStatus.status === "failed") {
          throw new Error("Assistant failed to process the document");
        }
      }

      const messages = await openai.beta.threads.messages.list(thread.id);
      const assistantMessage = messages.data.find((msg) => msg.role === "assistant");

      if (!assistantMessage || !assistantMessage.content) {
        throw new Error("No response from Assistant.");
      }

      const summaryText = assistantMessage.content
        .map((item) => (item.type === 'text' ? item.text?.value || "" : ""))
        .join("\n\n");

      setSummary(summaryText);
      
      // Generate visual abstract from the summary with priorities
      const data = await generateVisualAbstract(summaryText, priorities);
      setAbstractData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setAbstractData(null);
    setError(null);
    setSummary("");
    setFile(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center">Research Visual Abstract Generator</h1>
          <p className="text-center mt-2 text-blue-100">
            Transform your research papers into beautiful visual abstracts instantly
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <ThemeSelector 
            selectedTheme={selectedTheme}
            onThemeChange={setSelectedTheme}
          />
          
          <PrioritySliders onChange={setPriorities} />
          
          <div className="bg-white shadow-xl rounded-lg overflow-hidden mb-8">
            <div className="px-6 py-8">
              <div className="text-center">
                <FileText className="mx-auto h-12 w-12 text-gray-400" />
                <h2 className="mt-4 text-2xl font-bold text-gray-900">Upload Research Paper</h2>
                <p className="mt-2 text-gray-600">Upload a PDF file to generate a visual abstract</p>
              </div>

              <form onSubmit={handlePDFSubmit} className="mt-8 space-y-6">
                <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                  <div className="space-y-1 text-center">
                    <FileUp className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                        <span>Upload a file</span>
                        <input
                          type="file"
                          className="sr-only"
                          accept=".pdf"
                          onChange={handleFileChange}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PDF up to 25MB</p>
                  </div>
                </div>

                {file && <div className="text-sm text-gray-600 text-center">Selected file: {file.name}</div>}

                <div>
                  <button
                    type="submit"
                    disabled={!file || loading}
                    className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                      !file || loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                    }`}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                        Processing...
                      </>
                    ) : (
                      "Generate Visual Abstract"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
          
          {error && (
            <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}
          
          {loading && (
            <div className="mt-8">
              <LoadingSpinner />
            </div>
          )}

          {abstractData && !loading && (
            <div className="mt-8">
              <VisualAbstract 
                data={abstractData} 
                theme={selectedTheme}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}