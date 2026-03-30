import { useState } from 'react';
import { useCurrentTime } from './hooks/useCurrentTime';
import { useBusSearch } from './hooks/useBusSearch';
import { getSelectableItems } from './utils/routeFinder';
import { timetable } from './data/timetable';
import { Header } from './components/Header';
import { StopSelector } from './components/StopSelector';
import { ResultsPanel } from './components/ResultsPanel';
import { FareInfo } from './components/FareInfo';
import { Footer } from './components/Footer';

const items = getSelectableItems(timetable);

function App() {
  const now = useCurrentTime(30000);
  const [originId, setOriginId] = useState<string | null>(null);
  const [destinationId, setDestinationId] = useState<string | null>(null);

  const results = useBusSearch(originId, destinationId, now);
  const hasSelection = originId !== null && destinationId !== null && originId !== destinationId;
  const isGroupOrigin = originId?.startsWith('group:') ?? false;
  const isGroupDestination = destinationId?.startsWith('group:') ?? false;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header now={now} />
      <main className="max-w-lg mx-auto px-4 py-4 space-y-4">
        <StopSelector
          items={items}
          originId={originId}
          destinationId={destinationId}
          onOriginChange={setOriginId}
          onDestinationChange={setDestinationId}
        />
        <ResultsPanel
          results={results}
          now={now}
          hasSelection={hasSelection}
          isGroupOrigin={isGroupOrigin}
          isGroupDestination={isGroupDestination}
        />
        <FareInfo />
      </main>
      <Footer />
    </div>
  );
}

export default App;
