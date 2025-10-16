import Head from 'next/head';
import { DefaultTemplate } from '@/components/templates/DefaultTemplate';
import PathfindingVisualizer from '@/components/organisms/apps/AStarPathFinder/PathfindingVisualizer';

export default function About() {
  return (
    <DefaultTemplate>
      <Head>
        <title>A* Path Finder - My Portfolio</title>
        <meta name="description" content="A* Path Finding Algorithm Visualizer" />
      </Head>

      <PathfindingVisualizer />
    </DefaultTemplate>
  );
}
