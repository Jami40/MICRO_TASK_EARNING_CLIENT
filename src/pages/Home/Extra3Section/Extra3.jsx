import React from 'react';

const Extra3 = () => {
    return (
        <section className="py-16 mt-10 rounded-xl bg-base-200">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        
        <div className="max-w-3xl mx-auto">
          <div className="join join-vertical w-full">
            {/* FAQ Item 1 */}
            <div className="collapse collapse-arrow join-item border border-base-300">
              <input type="radio" name="my-accordion-4" defaultChecked /> 
              <div className="collapse-title text-xl font-medium">
                What are micro tasks and how do they work?
              </div>
              <div className="collapse-content">
                <p>Micro tasks are small, quick online jobs that can be completed in minutes. These can include data entry, image tagging, surveys, or short transcriptions. You can pick tasks that match your skills and complete them at your own pace.</p>
              </div>
            </div>

            {/* FAQ Item 2 */}
            <div className="collapse collapse-arrow join-item border border-base-300">
              <input type="radio" name="my-accordion-4" />
              <div className="collapse-title text-xl font-medium">
                How much can I earn from micro tasks?
              </div>
              <div className="collapse-content">
                <p>Earnings vary based on task complexity and your efficiency. Most tasks pay between $0.10 to $5. Dedicated workers typically earn $200-$500 monthly, working part-time. The more tasks you complete accurately, the more you can earn.</p>
              </div>
            </div>

            {/* FAQ Item 3 */}
            <div className="collapse collapse-arrow join-item border border-base-300">
              <input type="radio" name="my-accordion-4" />
              <div className="collapse-title text-xl font-medium">
                How do I get paid for completed tasks?
              </div>
              <div className="collapse-content">
                <p>Payments are processed through secure payment methods like PayPal, bank transfer, or digital wallets. Once you reach the minimum payout threshold ($10), you can request a withdrawal. Payments are typically processed within 3-5 business days.</p>
              </div>
            </div>

            {/* FAQ Item 4 */}
            <div className="collapse collapse-arrow join-item border border-base-300">
              <input type="radio" name="my-accordion-4" />
              <div className="collapse-title text-xl font-medium">
                What skills do I need for micro tasks?
              </div>
              <div className="collapse-content">
                <p>Most micro tasks require basic computer skills and attention to detail. Some specialized tasks might need specific skills like data entry, translation, or content writing. We provide training resources to help you improve your task completion abilities.</p>
              </div>
            </div>

            {/* FAQ Item 5 */}
            <div className="collapse collapse-arrow join-item border border-base-300">
              <input type="radio" name="my-accordion-4" />
              <div className="collapse-title text-xl font-medium">
                How is task quality maintained?
              </div>
              <div className="collapse-content">
                <p>We use a rating system to track task completion quality. Higher ratings give you access to better-paying tasks. Random quality checks are performed, and consistent high-quality work is rewarded with bonuses and priority access to premium tasks.</p>
              </div>
            </div>

            {/* FAQ Item 6 */}
            <div className="collapse collapse-arrow join-item border border-base-300">
              <input type="radio" name="my-accordion-4" />
              <div className="collapse-title text-xl font-medium">
                Can I work on tasks from anywhere?
              </div>
              <div className="collapse-content">
                <p>Yes, you can work on tasks from anywhere with an internet connection. Our platform is accessible 24/7, allowing you to work according to your schedule. Some tasks might have country-specific requirements, which will be clearly indicated.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    );
};

export default Extra3;