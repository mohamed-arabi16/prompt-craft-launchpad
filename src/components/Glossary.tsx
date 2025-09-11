import { useTranslation } from "@/hooks/useTranslation";

/**
 * Glossary Component
 * Provides definitions of key terms for AI and search engine comprehension
 */
const Glossary = () => {
  const { t } = useTranslation();

  const terms = [
    {
      term: "AI Prompt Engineering",
      definition: t('glossaryPromptEngineering')
    },
    {
      term: "Large Language Model (LLM)",
      definition: t('glossaryLLM')
    },
    {
      term: "Token",
      definition: t('glossaryToken')
    },
    {
      term: "Context Window",
      definition: t('glossaryContextWindow')
    },
    {
      term: "Few-shot Learning",
      definition: t('glossaryFewShot')
    },
    {
      term: "Chain of Thought",
      definition: t('glossaryChainOfThought')
    },
    {
      term: "Temperature",
      definition: t('glossaryTemperature')
    },
    {
      term: "Fine-tuning",
      definition: t('glossaryFineTuning')
    }
  ];

  return (
    <section 
      className="py-24 bg-muted/30"
      aria-label="AI Terminology Glossary"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-6">
            {t('glossaryTitle')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('glossarySubtitle')}
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {terms.map((item, index) => (
              <div 
                key={index}
                className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow"
                itemScope
                itemType="https://schema.org/DefinedTerm"
              >
                <dt 
                  className="text-xl font-bold text-primary mb-3"
                  itemProp="name"
                >
                  {item.term}
                </dt>
                <dd 
                  className="text-muted-foreground leading-relaxed"
                  itemProp="description"
                >
                  {item.definition}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Related Resources */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold text-foreground mb-6">
            {t('relatedResources')}
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="https://platform.openai.com/docs/guides/prompt-engineering"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
              itemProp="url"
            >
              OpenAI Prompt Engineering Guide
            </a>
            <a 
              href="https://www.anthropic.com/research"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
              itemProp="url"
            >
              Anthropic Research Papers
            </a>
            <a 
              href="https://arxiv.org/list/cs.CL/recent"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
              itemProp="url"
            >
              Latest NLP Research
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Glossary;