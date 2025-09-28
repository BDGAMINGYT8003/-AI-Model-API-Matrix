
import React from 'react';
import { Header } from './components/Header';
import { ApiTable } from './components/ApiTable';
import { TABLE_HEADERS, REASONING_MODELS_DATA, NON_REASONING_MODELS_DATA, IMAGE_MODELS_DATA, VIDEO_MODELS_DATA } from './constants';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#141218] text-gray-200 font-sans leading-relaxed">
      <Header />
      <main className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="max-w-screen-2xl mx-auto space-y-16">
          
          <section id="reasoning-models">
            <h2 className="text-3xl font-bold text-gray-100 mb-4 tracking-tight">Reasoning & Thinking Models</h2>
            <p className="mb-8 text-lg text-gray-400 max-w-4xl">
              A detailed, side-by-side comparison of the top reasoning/thinking model APIs, ranked by performance on industry benchmarks and user-preference evaluations.
            </p>
            <ApiTable headers={TABLE_HEADERS} data={REASONING_MODELS_DATA} />
          </section>

          <section id="general-purpose-models">
            <h2 className="text-3xl font-bold text-gray-100 mb-4 tracking-tight">General Purpose & Multimodal Models</h2>
            <p className="mb-8 text-lg text-gray-400 max-w-4xl">
              This matrix provides a comprehensive, at-a-glance comparison of the leading general-purpose LLM APIs available to developers in 2025.
            </p>
            <ApiTable headers={TABLE_HEADERS} data={NON_REASONING_MODELS_DATA} />
          </section>

          <section id="image-models">
            <h2 className="text-3xl font-bold text-gray-100 mb-4 tracking-tight">Image Generation & Editing Models</h2>
            <p className="mb-8 text-lg text-gray-400 max-w-4xl">
              The following table aggregates key data points for leading image generation and editing models, providing a standardized format for direct comparison.
            </p>
            <ApiTable headers={TABLE_HEADERS} data={IMAGE_MODELS_DATA} />
          </section>

          <section id="video-models">
            <h2 className="text-3xl font-bold text-gray-100 mb-4 tracking-tight">Video Generation Models</h2>
            <p className="mb-8 text-lg text-gray-400 max-w-4xl">
              A high-density, scannable resource for developers to evaluate and contrast the key technical, business, and operational characteristics of each video generation platform.
            </p>
            <ApiTable headers={TABLE_HEADERS} data={VIDEO_MODELS_DATA} />
          </section>

        </div>
      </main>
      <footer className="text-center py-8 text-gray-500 text-sm">
        <p>AI Model API Matrix &copy; {new Date().getFullYear()}. All data is for informational purposes.</p>
      </footer>
    </div>
  );
};

export default App;
