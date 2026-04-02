import { useState, useCallback } from 'react';
import { useCurrentTime } from './hooks/useCurrentTime';
import { useBusSearch } from './hooks/useBusSearch';
import { getSelectableItems, getReachableStopIds, getOriginStopIds, resolveStopIds } from './utils/routeFinder';
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

  const handleOriginChange = useCallback((newOriginId: string | null) => {
    setOriginId(newOriginId);
    // Clear destination if it's no longer reachable from the new origin
    if (newOriginId && destinationId) {
      const reachable = getReachableStopIds(newOriginId, timetable);
      const destStopIds = resolveStopIds(destinationId);
      if (!destStopIds.some(id => reachable.has(id))) {
        setDestinationId(null);
      }
    }
  }, [destinationId]);

  const handleDestinationChange = useCallback((newDestId: string | null) => {
    setDestinationId(newDestId);
    // Clear origin if it can no longer reach the new destination
    if (newDestId && originId) {
      const origins = getOriginStopIds(newDestId, timetable);
      const originStopIds = resolveStopIds(originId);
      if (!originStopIds.some(id => origins.has(id))) {
        setOriginId(null);
      }
    }
  }, [originId]);

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
          onOriginChange={handleOriginChange}
          onDestinationChange={handleDestinationChange}
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
