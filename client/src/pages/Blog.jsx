import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FiHardDrive, FiMonitor, FiSave, FiWind, FiX, FiBookOpen } from 'react-icons/fi';

const articles = [
  {
    key: 'ssdFailing',
    icon: FiHardDrive,
    color: 'text-red-400',
    bg: 'bg-red-400/10',
    content: `### Warning Signs Your SSD Is Failing

1. **Frequent crashes or blue screens** - If your computer freezes or shows BSOD errors frequently, your SSD might be failing.
2. **Files becoming corrupted** - When you notice files can't be opened or saved correctly.
3. **Slow read/write speeds** - A noticeable decrease in performance.
4. **Bad blocks accumulating** - Use tools like CrystalDiskInfo to check SMART data.
5. **Drive not detected** - The BIOS sometimes fails to detect the drive.

**What to do:** Back up your data immediately and bring your device for diagnosis. Early detection can save your files.`
  },
  {
    key: 'beforeBringing',
    icon: FiMonitor,
    color: 'text-cyan-accent',
    bg: 'bg-cyan-accent/10',
    content: `### Before Bringing Your Laptop for Repair

1. **Back up important files** - Copy important documents, photos, and files to a USB drive or cloud storage.
2. **Note your passwords** - Write down Wi-Fi passwords and account credentials you might need.
3. **Remove external devices** - Unplug USB drives, mice, and other peripherals.
4. **Describe the problem clearly** - Write down when the issue started and what triggers it.
5. **Bring the charger** - Always bring your device's power adapter.
6. **Remove sensitive data** - If you're concerned, remove sensitive files before bringing it in.
7. **Disable device lock** - If possible, provide login credentials so we can diagnose properly.`
  },
  {
    key: 'backupPractices',
    icon: FiSave,
    color: 'text-green-400',
    bg: 'bg-green-400/10',
    content: `### The 3-2-1 Backup Rule

The golden rule of data protection:

- **3 copies** of your data
- **2 different storage types** (e.g., SSD + cloud)
- **1 offsite backup** (cloud storage)

#### Recommended Setup:
1. **Primary data** on your computer's main drive
2. **Local backup** on an external hard drive (automated with backup software)
3. **Cloud backup** using services like Google Drive, OneDrive, or Backblaze

#### Automation Tips:
- Set up automatic daily backups
- Use versioning to keep multiple file versions
- Test your backups regularly by restoring a file
- Keep your backup drives encrypted for security`
  },
  {
    key: 'overheating',
    icon: FiWind,
    color: 'text-orange-400',
    bg: 'bg-orange-400/10',
    content: `### Preventing Laptop Overheating

#### Common Causes:
- Dust buildup in vents and fans
- Dried thermal paste
- Blocked air vents (using laptop on bed/couch)
- Running demanding software

#### Prevention Tips:
1. **Use a laptop stand or cooling pad** - Elevating the laptop improves airflow
2. **Clean vents regularly** - Use compressed air every 3-6 months
3. **Don't block air vents** - Use on hard, flat surfaces
4. **Monitor temperatures** - Use software like HWMonitor
5. **Professional cleaning** - Get thermal paste replaced every 2-3 years
6. **Close unnecessary programs** - Reduce CPU load when not needed
7. **Keep room cool** - Ambient temperature affects laptop temps`
  }
];

export default function Blog() {
  const { t } = useTranslation();
  const [selectedArticle, setSelectedArticle] = useState(null);

  return (
    <>
      <Helmet>
        <title>Tips & Articles - LaptopDoctor</title>
        <meta name="description" content="Helpful guides and tips for maintaining your PC and laptop." />
      </Helmet>

      <section className="pt-28 pb-24 bg-navy-900 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-14">
            <div className="w-16 h-16 rounded-2xl bg-cyan-accent/10 flex items-center justify-center mx-auto mb-6">
              <FiBookOpen className="text-cyan-accent text-3xl" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{t('blog.title')}</h1>
            <p className="text-gray-400 text-lg max-w-xl mx-auto leading-relaxed">{t('blog.subtitle')}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {articles.map((article, i) => (
              <motion.div
                key={article.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-2xl bg-navy-800 border border-navy-700 hover:border-gold/30 transition-all cursor-pointer group hover:shadow-lg hover:shadow-gold/5"
                onClick={() => setSelectedArticle(article)}
              >
                <div className={`w-14 h-14 rounded-2xl ${article.bg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                  <article.icon className={`${article.color} text-2xl`} />
                </div>
                <h2 className="text-xl font-semibold text-white mb-3 group-hover:text-gold transition-colors">{t(`blog.${article.key}`)}</h2>
                <p className="text-gray-400 text-sm mb-5 leading-relaxed">{t(`blog.${article.key}Desc`)}</p>
                <span className="text-gold text-sm font-semibold group-hover:text-gold-light transition-colors inline-flex items-center gap-1">
                  {t('blog.readMore')} &rarr;
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Article Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={() => setSelectedArticle(null)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-navy-800 rounded-2xl border border-navy-700 p-8 md:p-10 max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl ${selectedArticle.bg} flex items-center justify-center`}>
                    <selectedArticle.icon className={`${selectedArticle.color} text-xl`} />
                  </div>
                  <h2 className="text-xl font-bold text-white">{t(`blog.${selectedArticle.key}`)}</h2>
                </div>
                <button onClick={() => setSelectedArticle(null)} className="w-10 h-10 rounded-xl bg-navy-700 flex items-center justify-center text-gray-400 hover:text-white hover:bg-navy-600 transition-colors"><FiX size={20} /></button>
              </div>
              <div className="prose prose-invert prose-sm max-w-none text-gray-300 leading-relaxed whitespace-pre-line">
                {selectedArticle.content.split('\n').map((line, i) => {
                  if (line.startsWith('### ')) return <h3 key={i} className="text-xl font-bold text-white mt-6 mb-3">{line.replace('### ', '')}</h3>;
                  if (line.startsWith('#### ')) return <h4 key={i} className="text-lg font-semibold text-gold mt-5 mb-2">{line.replace('#### ', '')}</h4>;
                  if (line.startsWith('- **')) {
                    const parts = line.replace('- **', '').split('**');
                    return <p key={i} className="ml-4 mb-2 flex gap-2"><span className="text-gold shrink-0">&bull;</span><span><strong className="text-white">{parts[0]}</strong>{parts[1]}</span></p>;
                  }
                  if (line.match(/^\d+\./)) return <p key={i} className="ml-4 mb-2">{line}</p>;
                  return <p key={i} className="mb-2">{line}</p>;
                })}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
