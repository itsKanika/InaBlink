import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Cpu, Zap, Globe, Users } from 'lucide-react';

const About: React.FC = () => {
  const features = [
    {
      icon: <Cpu className="w-8 h-8 text-blue-500" />,
      title: "AI-Powered Analysis",
      description: "Real-time processing of tech news using advanced AI algorithms and Pathway's streaming capabilities."
    },
    {
      icon: <Globe className="w-8 h-8 text-green-500" />,
      title: "Global Tech Coverage",
      description: "Comprehensive coverage of technology news from trusted sources worldwide."
    },
    {
      icon: <Zap className="w-8 h-8 text-yellow-500" />,
      title: "Real-Time Updates",
      description: "Instant news delivery powered by Pathway's real-time streaming and processing engine."
    },
    {
      icon: <Code2 className="w-8 h-8 text-purple-500" />,
      title: "Developer Focus",
      description: "Curated content specifically for developers, engineers, and tech enthusiasts."
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen py-12"
    >
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white py-24">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-4 text-center"
        >
          <h1 className="text-5xl font-bold mb-6">Stay Ahead of Tech</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            InaBlink delivers real-time tech news and insights, powered by Pathway's advanced streaming technology.
          </p>
          <motion.img
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
            src="https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Tech Innovation"
            className="rounded-xl shadow-2xl max-w-4xl mx-auto"
          />
        </motion.div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-slate-50 dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Powered by Innovation</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Experience the future of tech news delivery with our cutting-edge features
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Dedicated professionals working to bring you the latest in tech
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                name: "Alex Chen",
                role: "AI Engineer",
                image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              },
              {
                name: "Sarah Johnson",
                role: "Tech Lead",
                image: "https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              },
              {
                name: "Mike Rivera",
                role: "Data Scientist",
                image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              }
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-48 h-48 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-slate-600 dark:text-slate-400">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default About;