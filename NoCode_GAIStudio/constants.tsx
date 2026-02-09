
import { AppState } from './types';

export const INITIAL_STATE: AppState = {
  projects: [
    {
      id: '1',
      title: 'Enterprise RAG System',
      category: 'Deep Learning',
      description: 'Custom Retrieval-Augmented Generation system designed for architectural document analysis using specialized LLMs.',
      stack: ['Python', 'Pinecone', 'LangChain', 'OpenAI'],
      metrics: '45% increase in retrieval accuracy',
      imageUrl: 'https://picsum.photos/seed/rag/800/600',
      publishStatus: 'published'
    },
    {
      id: '2',
      title: 'Quantum Shors Algorithm Implementation',
      category: 'Quantum Computing',
      description: 'Optimization of Shors algorithm for integer factorization on NISQ devices using Qiskit.',
      stack: ['Qiskit', 'Python', 'LaTeX'],
      metrics: 'O(log n) efficiency validation',
      imageUrl: 'https://picsum.photos/seed/quantum/800/600',
      publishStatus: 'published'
    },
    {
      id: '3',
      title: 'Deepfake Image Classification',
      category: 'Computer Vision',
      description: 'Advanced CNN-based detection system to identify AI-generated facial manipulations with high precision.',
      stack: ['TensorFlow', 'Keras', 'Flask', 'OpenCV'],
      metrics: '98.2% Accuracy on Celeb-DF dataset',
      imageUrl: 'https://picsum.photos/seed/dfake/800/600',
      publishStatus: 'published'
    }
  ],
  posts: [
    {
      id: '1',
      title: 'Demystifying Quantum Circuits for CSE Students',
      slug: 'quantum-circuits-cse',
      content: 'Quantum computing is often seen as magic, but for a CSE student, it is essentially linear algebra...',
      author: 'S3RA Engineering',
      date: '2024-10-15',
      category: 'Quantum',
      publishStatus: 'published'
    },
    {
      id: '2',
      title: 'GATE 2026 Preparation: The Road Ahead',
      slug: 'gate-2026-roadmap',
      content: 'Starting early is key. Here is how we are balancing 5th-semester projects with core technical studies...',
      author: 'Academic Team',
      date: '2024-11-01',
      category: 'Education',
      publishStatus: 'published'
    }
  ],
  team: [
    {
      id: '1',
      name: 'Dr. Quantum',
      role: 'Lead Researcher',
      bio: 'Expert in quantum error correction and distributed computing systems.',
      imageUrl: 'https://picsum.photos/seed/person1/400/400'
    }
  ],
  leads: [],
  settings: {
    primaryColor: '#22d3ee',
    secondaryColor: '#3b82f6',
    fontFamily: 'Inter',
    siteName: 'S3RA Quantum & AI Solutions',
    metaDescription: 'Modern technical solutions for Quantum & AI problems.',
    sections: {
      hero: true,
      services: true,
      innovation: true,
      portfolio: true,
      faq: true
    }
  }
};
