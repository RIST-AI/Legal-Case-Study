document.addEventListener('DOMContentLoaded', function() {
    // Track user decisions and answers
    const userAnswers = {
        documentReview: {},
        january: {},
        february: {},
        march: {},
        april: {},
        may: {},
        june: {}
    };
    
    // Track section scores for final assessment
    const sectionScores = {
        'document-review': 0,
        'january': 0,
        'february': 0,
        'march': 0,
        'april': 0,
        'may': 0,
        'june': 0
    };
    
    // Track total score
    let totalCorrect = 0;
    let totalQuestions = 0;
    
    // Track correct answers for scoring
    const correctAnswers = {
        // Document Review
        'wage-percentage': '28.6%',
        'super-compliance': 'no',
        'award-rates': 'yes',
        'license-attention': 'food',
        'business-structure': 'yes',
        
        // January
        'water-license': 'renew-now',
        'food-cert': 'renew',
        'insurance-issue': 'workers-comp',
        'workers-comp-action': 'renew',
        
        // February
        'new-employee-rate': 'no',
        'new-employee-action': 'both',
        'liability-renewal': 'renew',
        'structure-recommendation': 'consult',
        'structure-consequences': 'both',
        
        // March
        'super-shortfall': 'review',
        'super-prevention': 'system',
        'tractor-insurance': 'update',
        'purchase-documentation': 'asset',
        'chemical-inspection': 'audit',
        
        // April
        'incident-action': 'record',
        'preventive-measures': 'review',
        'gst-calculation': '2500',
        'bas-deadline': 'april28',
        'missing-insurance': 'both',
        'insurance-priority': 'risk',
        
        // May
        'pay-adjustment': 'multiple',
        'adjustment-timing': 'immediately',
        'property-coverage': 'no',
        'property-action': 'increase',
        'record-system': 'cloud',
        
        // June
        'payment-summaries': 'july14',
        'super-deadline': 'july28',
        'structure-decision': 'company',
        'review-frequency': 'quarterly'
    };
    
    // Detailed explanations for each answer
    const answerExplanations = {
        'wage-percentage': 'To calculate the percentage of revenue spent on wages, divide the wages ($30,000) by the total revenue ($105,000), then multiply by 100. This gives 28.6% (30,000 ÷ 105,000 × 100 = 28.6%).',
        'super-compliance': 'The superannuation contribution should be 11.5% of wages. For $30,000 in wages, the correct contribution is $3,450 (30,000 × 0.115 = 3,450). The actual contribution was only $3,000, which is $450 short.',
        'award-rates': 'All employees are being paid at or above the minimum award rates for their positions as shown in the employee records. Each employee\'s pay rate meets or exceeds the minimum rate for their award level.',
        'license-attention': 'The Food Safety Certification expired in November 2023 (current date is January 2024), making it the most urgent license issue. The Water Usage License is expiring soon but hasn\'t expired yet.',
        'business-structure': 'There is a mismatch between the business structure (partnership) and the business name (which includes "Pty Ltd"). A "Pty Ltd" designation is only appropriate for a registered company, not a partnership.',
        
        'water-license': 'The Water Usage License expires on January 14, 2024, which is very soon. Without this license, the farm cannot legally use water for irrigation, which would severely impact operations. Immediate renewal is necessary.',
        'food-cert': 'The Food Safety Certification has already expired, and a major buyer is requesting current certification before placing an order. Renewing immediately is necessary to maintain business relationships and comply with regulations.',
        'insurance-issue': 'The Workers\' Compensation policy expired on December 31, 2023, and it\'s now January 2024. This creates immediate legal exposure as all employers must maintain current workers\' compensation insurance for their employees.',
        'workers-comp-action': 'The policy needs to be renewed immediately to maintain legal compliance and ensure all employees are covered in case of workplace injuries.',
        
        'new-employee-rate': 'The proposed rate of $24.00/hour is below the minimum casual rate for Horticulture Award Level 1, which is $30.13/hour including the 25% casual loading. Casual employees must receive the base rate plus a 25% loading.',
        'new-employee-action': 'Two actions are needed: 1) Update the Workers\' Compensation insurance to include the new employee, and 2) Adjust the pay rate to include the required casual loading to meet the minimum award rate.',
        'liability-renewal': 'The Public Liability Insurance is due to expire on January 31, 2024. The most important action is to renew the policy to maintain continuous coverage, even if the premium has increased. Operating without liability insurance creates significant risk.',
        'structure-recommendation': 'Consulting with a business lawyer is the best first step because they can provide expert advice on the legal implications of the mismatch and recommend the most appropriate solution based on the business\'s specific circumstances.',
        'structure-consequences': 'There are two main consequences: 1) Legal issues including potential fines for misrepresentation of business structure, and 2) Partners may incorrectly believe they have limited liability protection when they don\'t, exposing their personal assets to business risks.',
        
        'super-shortfall': 'It\'s best to review all calculations first to confirm the exact shortfall amount of $450 and ensure no other errors exist. After confirming the shortfall, the business should make the additional payment to meet its legal obligations.',
        'super-prevention': 'Implementing a payroll system that automatically calculates superannuation based on current rates is the most reliable way to prevent future errors. This removes the potential for human calculation errors.',
        'tractor-insurance': 'The property insurance should be updated before the tractor is delivered to ensure it\'s covered from the moment it arrives on the property. Waiting until after delivery would leave the expensive asset uninsured during transport and initial use.',
        'purchase-documentation': 'A tractor valued at $45,000 is a capital asset, not a regular expense. It should be recorded on the balance sheet and depreciated over its useful life (typically 5-10 years) according to tax regulations.',
        'chemical-inspection': 'Conducting a self-audit using the requirements checklist allows the farm to identify and address any compliance issues before the official inspection. This proactive approach reduces the risk of failing the inspection.',
        
        'incident-action': 'Minor injuries requiring only first aid should be recorded in the workplace register to maintain accurate records of all incidents, but don\'t typically need to be reported to the workers\' compensation insurer unless they result in time off work or medical treatment.',
        'preventive-measures': 'Even for minor incidents, it\'s best practice to review what happened, update procedures if needed, and provide training to prevent similar incidents in the future. This comprehensive approach helps create a safer workplace.',
        'gst-calculation': 'To calculate the net GST amount, subtract the GST paid on purchases ($3,000) from the GST collected on sales ($5,500). This gives $2,500 payable to the tax office (5,500 - 3,000 = 2,500).',
        'bas-deadline': 'For quarterly Business Activity Statements (BAS), the deadline is the 28th day of the month following the end of the quarter. For the January-March quarter, the deadline is April 28.',
        'missing-insurance': 'As an agricultural business, XYZ Farms should have both crop insurance (to protect against crop failure due to weather, pests, etc.) and business interruption insurance (to cover ongoing expenses if operations are disrupted).',
        'insurance-priority': 'Conducting a risk assessment is the best approach to determine which insurance is more critical based on the farm\'s specific risks, considering factors like crop types, weather patterns, and financial situation.',
        
        'pay-adjustment': 'Multiple employees need adjustments based on the updated award rates: David Wilson (now $25.80), Sarah Johnson (now $25.20), and Emma Garcia (now $30.13). Their current rates are below the new minimum rates for their positions.',
        'adjustment-timing': 'Pay rate adjustments should be implemented immediately from the next pay period to ensure compliance with award rates. Delaying implementation could result in underpayment of employees and potential legal issues.',
        'property-coverage': 'The current property insurance coverage ($100,000) is inadequate compared to the total asset value ($210,000). If a major incident occurred, the farm would not have sufficient coverage to replace all damaged assets.',
        'property-action': 'At minimum, the coverage should be increased to cover buildings and equipment ($135,000), but ideally it should cover all insurable assets. This ensures the business can recover financially from a major loss event.',
        'record-system': 'A cloud-based document management system with retention policies is the most secure and efficient way to maintain records for the required periods. It provides backup protection, organized storage, and automatic retention management.',
        
        'payment-summaries': 'Employee payment summaries (or income statements) must be provided to employees by July 14 each year. This is a legal requirement under tax legislation.',
        'super-deadline': 'The deadline for making superannuation contributions for the April-June quarter is July 28. This ensures the contributions are made within 28 days after the end of the quarter as required by law.',
        'structure-decision': 'Converting to a company structure is the best long-term solution because it provides limited liability protection for the owners and aligns with the business name that includes "Pty Ltd". This creates legal clarity and appropriate protection.',
        'review-frequency': 'Quarterly reviews provide a good balance between staying current with compliance obligations and not being too time-consuming. This frequency aligns with many reporting requirements (like BAS) and allows timely identification of issues.'
    };
    
    // Calendar items (checkbox group)
    const correctCalendarItems = ['tax', 'super', 'insurance', 'licenses', 'employee'];
    const calendarItemExplanation = 'A comprehensive compliance calendar should include: tax lodgment deadlines (for BAS, income tax, etc.), superannuation payment due dates (quarterly), insurance policy renewal dates (to avoid coverage gaps), license and permit expiry dates (to maintain legal operation), and employee review dates (to ensure ongoing compliance with awards).';
    
    // Track sections that have been submitted
    const sectionsSubmitted = {
        'document-review': false,
        'january': false,
        'february': false,
        'march': false,
        'april': false,
        'may': false,
        'june': false
    };
    
    // Navigation and Progress
    const sections = ['student-info', 'introduction', 'document-review', 'january', 'february', 'march', 'april', 'may', 'june', 'summary'];
    let currentSectionIndex = 0;
    
    function updateProgressBar() {
        const progressPercentage = ((currentSectionIndex + 1) / sections.length) * 100;
        document.getElementById('progress-bar').style.width = `${progressPercentage}%`;
    }
    
    function navigateToSection(sectionIndex) {
        // Hide all sections
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
        
        // Show the current section
        const currentSection = document.getElementById(sections[sectionIndex]);
        currentSection.classList.add('active');
        
        // Update progress steps
        document.querySelectorAll('.step').forEach((step, index) => {
            if (index <= sectionIndex) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });
        
        // Update progress bar
        currentSectionIndex = sectionIndex;
        updateProgressBar();
        
        // If we're on the summary section, generate the summary
        if (sections[sectionIndex] === 'summary') {
            generateSummary();
        }
        
        // Scroll to top
        window.scrollTo(0, 0);
    }
    
    // Start button click handler
    document.getElementById('start-simulation').addEventListener('click', function() {
        navigateToSection(2); // Navigate to document review
    });
    
    // Document Tab Navigation (generic function for all tab sections)
    document.querySelectorAll('.document-tabs .tab').forEach(tab => {
        tab.addEventListener('click', function() {
            // Find the closest parent with document-tabs class
            const tabsContainer = this.closest('.document-tabs');
            
            // Get all tabs within this container
            const tabs = tabsContainer.querySelectorAll('.tab');
            
            // Get the tab ID
            const tabId = this.getAttribute('data-tab');
            
            // Update active tab within this container
            tabs.forEach(t => {
                t.classList.remove('active');
            });
            this.classList.add('active');
            
            // Find the related document container
            const documentContainer = tabsContainer.nextElementSibling;
            
            // Show the selected document
            documentContainer.querySelectorAll('.document').forEach(doc => {
                doc.classList.remove('active');
            });
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Setup radio button handlers (just store answers, no feedback)
    function setupRadioHandler(name, section) {
        document.querySelectorAll(`input[name="${name}"]`).forEach(radio => {
            radio.addEventListener('change', function() {
                // Check if section is already submitted
                if (sectionsSubmitted[section]) {
                    // Prevent changing answer by reverting to the stored answer
                    const sectionKey = section === 'document-review' ? 'documentReview' : section;
                    const storedValue = userAnswers[sectionKey][name];
                    
                    // Find the radio button with the stored value and check it
                    document.querySelectorAll(`input[name="${name}"]`).forEach(r => {
                        r.checked = (r.value === storedValue);
                    });
                    
                    // Alert the user
                    alert('You cannot change your answers after submission.');
                    return;
                }
                
                const selectedValue = this.value;
                
                // Convert section ID to match userAnswers object property
                const sectionKey = section === 'document-review' ? 'documentReview' : section;
                
                // Make sure the section object exists
                if (!userAnswers[sectionKey]) {
                    userAnswers[sectionKey] = {};
                }
                
                userAnswers[sectionKey][name] = selectedValue;
                
                // Update the submit button state
                updateSubmitButtonState(section);
            });
        });
    }
    
    // Setup all radio handlers
    function setupAllRadioHandlers() {
        // Document Review
        setupRadioHandler('wage-percentage', 'document-review');
        setupRadioHandler('super-compliance', 'document-review');
        setupRadioHandler('award-rates', 'document-review');
        setupRadioHandler('license-attention', 'document-review');
        setupRadioHandler('business-structure', 'document-review');
        
        // January
        setupRadioHandler('water-license', 'january');
        setupRadioHandler('food-cert', 'january');
        setupRadioHandler('insurance-issue', 'january');
        setupRadioHandler('workers-comp-action', 'january');
        
        // February
        setupRadioHandler('new-employee-rate', 'february');
        setupRadioHandler('new-employee-action', 'february');
        setupRadioHandler('liability-renewal', 'february');
        setupRadioHandler('structure-recommendation', 'february');
        setupRadioHandler('structure-consequences', 'february');
        
        // March
        setupRadioHandler('super-shortfall', 'march');
        setupRadioHandler('super-prevention', 'march');
        setupRadioHandler('tractor-insurance', 'march');
        setupRadioHandler('purchase-documentation', 'march');
        setupRadioHandler('chemical-inspection', 'march');
        
        // April
        setupRadioHandler('incident-action', 'april');
        setupRadioHandler('preventive-measures', 'april');
        setupRadioHandler('gst-calculation', 'april');
        setupRadioHandler('bas-deadline', 'april');
        setupRadioHandler('missing-insurance', 'april');
        setupRadioHandler('insurance-priority', 'april');
        
        // May
        setupRadioHandler('pay-adjustment', 'may');
        setupRadioHandler('adjustment-timing', 'may');
        setupRadioHandler('property-coverage', 'may');
        setupRadioHandler('property-action', 'may');
        setupRadioHandler('record-system', 'may');
        
        // June
        setupRadioHandler('payment-summaries', 'june');
        setupRadioHandler('super-deadline', 'june');
        setupRadioHandler('structure-decision', 'june');
        setupRadioHandler('review-frequency', 'june');
    }
    
    // Calendar Items Checkbox Handler
    document.querySelectorAll('input[name="calendar-items"]').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            // Check if section is already submitted
            if (sectionsSubmitted['june']) {
                // Revert all checkboxes to their stored state
                const selectedItems = userAnswers.june['calendar-items'] || [];
                
                document.querySelectorAll('input[name="calendar-items"]').forEach(cb => {
                    cb.checked = selectedItems.includes(cb.value);
                });
                
                // Alert the user
                alert('You cannot change your answers after submission.');
                return;
            }
            
            const selectedItems = [];
            document.querySelectorAll('input[name="calendar-items"]:checked').forEach(checked => {
                selectedItems.push(checked.value);
            });
            
            userAnswers.june['calendar-items'] = selectedItems;
            
            // Update the submit button state
            updateSubmitButtonState('june');
        });
    });
    
    // Update Submit button state
    function updateSubmitButtonState(section) {
        const submitButton = document.getElementById(`submit-${section}`);
        if (submitButton) {
            const allQuestionsAnswered = areAllQuestionsAnswered(section);
            submitButton.disabled = !allQuestionsAnswered || sectionsSubmitted[section];
        }
    }
    
    // Check if all questions in a section are answered
    function areAllQuestionsAnswered(section) {
        const requiredQuestions = {
            'document-review': ['wage-percentage', 'super-compliance', 'award-rates', 'license-attention', 'business-structure'],
            'january': ['water-license', 'food-cert', 'insurance-issue', 'workers-comp-action'],
            'february': ['new-employee-rate', 'new-employee-action', 'liability-renewal', 'structure-recommendation', 'structure-consequences'],
            'march': ['super-shortfall', 'super-prevention', 'tractor-insurance', 'purchase-documentation', 'chemical-inspection'],
            'april': ['incident-action', 'preventive-measures', 'gst-calculation', 'bas-deadline', 'missing-insurance', 'insurance-priority'],
            'may': ['pay-adjustment', 'adjustment-timing', 'property-coverage', 'property-action', 'record-system'],
            'june': ['payment-summaries', 'super-deadline', 'structure-decision', 'review-frequency']
        };
        
        const sectionKey = section === 'document-review' ? 'documentReview' : section;
        
        // Check if all required questions are answered
        let allAnswered = true;
        
        if (requiredQuestions[section]) {
            for (const question of requiredQuestions[section]) {
                if (!userAnswers[sectionKey][question]) {
                    allAnswered = false;
                    break;
                }
            }
        }
        
        // Special case for calendar items
        if (section === 'june' && allAnswered) {
            if (!userAnswers.june['calendar-items'] || userAnswers.june['calendar-items'].length === 0) {
                allAnswered = false;
            }
        }
        
        return allAnswered;
    }
    
    // Calculate section score
    function calculateSectionScore(section) {
        const sectionKey = section === 'document-review' ? 'documentReview' : section;
        const requiredQuestions = {
            'document-review': ['wage-percentage', 'super-compliance', 'award-rates', 'license-attention', 'business-structure'],
            'january': ['water-license', 'food-cert', 'insurance-issue', 'workers-comp-action'],
            'february': ['new-employee-rate', 'new-employee-action', 'liability-renewal', 'structure-recommendation', 'structure-consequences'],
            'march': ['super-shortfall', 'super-prevention', 'tractor-insurance', 'purchase-documentation', 'chemical-inspection'],
            'april': ['incident-action', 'preventive-measures', 'gst-calculation', 'bas-deadline', 'missing-insurance', 'insurance-priority'],
            'may': ['pay-adjustment', 'adjustment-timing', 'property-coverage', 'property-action', 'record-system'],
            'june': ['payment-summaries', 'super-deadline', 'structure-decision', 'review-frequency']
        };
        
        let correctCount = 0;
        let totalQuestionsInSection = requiredQuestions[section].length;
        
        requiredQuestions[section].forEach(question => {
            if (userAnswers[sectionKey][question] === correctAnswers[question]) {
                correctCount++;
            }
        });
        
        // Special case for calendar items
        if (section === 'june' && userAnswers.june['calendar-items']) {
            totalQuestionsInSection++;
            const selectedItems = userAnswers.june['calendar-items'];
            const allCorrectSelected = correctCalendarItems.every(item => selectedItems.includes(item));
            const noIncorrectSelected = selectedItems.every(item => correctCalendarItems.includes(item) || item === 'equipment');
            
            if (allCorrectSelected && noIncorrectSelected) {
                correctCount++;
            }
        }
        
        const score = Math.round((correctCount / totalQuestionsInSection) * 100);
        
        // Store the score for final assessment
        sectionScores[section] = score;
        
        // Update running total
        totalCorrect += correctCount;
        totalQuestions += totalQuestionsInSection;
        
        return {
            score: score,
            correct: correctCount,
            total: totalQuestionsInSection,
            runningTotal: {
                correct: totalCorrect,
                total: totalQuestions,
                percentage: Math.round((totalCorrect / totalQuestions) * 100)
            }
        };
    }
    
    // Submit answers for a section
    function submitSectionAnswers(section) {
        // Mark section as submitted
        sectionsSubmitted[section] = true;
        
        const sectionKey = section === 'document-review' ? 'documentReview' : section;
        const requiredQuestions = {
            'document-review': ['wage-percentage', 'super-compliance', 'award-rates', 'license-attention', 'business-structure'],
            'january': ['water-license', 'food-cert', 'insurance-issue', 'workers-comp-action'],
            'february': ['new-employee-rate', 'new-employee-action', 'liability-renewal', 'structure-recommendation', 'structure-consequences'],
            'march': ['super-shortfall', 'super-prevention', 'tractor-insurance', 'purchase-documentation', 'chemical-inspection'],
            'april': ['incident-action', 'preventive-measures', 'gst-calculation', 'bas-deadline', 'missing-insurance', 'insurance-priority'],
            'may': ['pay-adjustment', 'adjustment-timing', 'property-coverage', 'property-action', 'record-system'],
            'june': ['payment-summaries', 'super-deadline', 'structure-decision', 'review-frequency']
        };
        
        // Calculate score
        const scoreResult = calculateSectionScore(section);
        const sectionScore = scoreResult.score;
        const runningScore = scoreResult.runningTotal.percentage;
        
        // Disable all radio buttons in this section
        requiredQuestions[section].forEach(question => {
            document.querySelectorAll(`input[name="${question}"]`).forEach(radio => {
                radio.disabled = true;
            });
        });
        
        // Special case for calendar items
        if (section === 'june') {
            document.querySelectorAll('input[name="calendar-items"]').forEach(checkbox => {
                checkbox.disabled = true;
            });
        }
        
        // Create or update score display
        let scoreElement = document.getElementById(`${section}-score`);
        
        if (!scoreElement) {
            scoreElement = document.createElement('div');
            scoreElement.id = `${section}-score`;
            scoreElement.className = 'section-score';
            
            // Insert before the continue button
            const continueButton = document.getElementById(`${section}-continue`);
            continueButton.parentNode.insertBefore(scoreElement, continueButton);
        }
        
        // Update score display with running total
        scoreElement.innerHTML = `
            <p><strong>Section score: ${sectionScore}% (${scoreResult.correct} out of ${scoreResult.total} correct)</strong></p>
            <p><strong>Running total: ${runningScore}% (${scoreResult.runningTotal.correct} out of ${scoreResult.runningTotal.total} correct)</strong></p>
            <p>Please review the explanations below to understand the correct answers.</p>
        `;
        scoreElement.className = 'section-score info';
        
        // Add review acknowledgment checkbox
        const reviewAcknowledgment = document.createElement('div');
        reviewAcknowledgment.className = 'review-acknowledgment';
        reviewAcknowledgment.innerHTML = `
            <label>
                <input type="checkbox" id="acknowledge-${section}"> 
                I have reviewed the explanations and understand the correct answers.
            </label>
        `;
        scoreElement.appendChild(reviewAcknowledgment);
        
        // Add event listener to the checkbox
        document.getElementById(`acknowledge-${section}`).addEventListener('change', function() {
            document.getElementById(`${section}-continue`).disabled = !this.checked;
        });
        
        // Show feedback and explanations for each question
        requiredQuestions[section].forEach(question => {
            const feedbackElement = document.getElementById(`${question}-feedback`);
            const userAnswer = userAnswers[sectionKey][question];
            const isCorrect = userAnswer === correctAnswers[question];
            const explanation = answerExplanations[question];
            
            if (feedbackElement) {
                if (isCorrect) {
                    feedbackElement.innerHTML = `
                        <p><strong>Correct!</strong> Your answer: ${getAnswerText(question, userAnswer)}</p>
                        <p>${explanation}</p>
                    `;
                } else {
                    feedbackElement.innerHTML = `
                        <p><strong>Incorrect.</strong> Your answer: ${getAnswerText(question, userAnswer)}</p>
                        <p>The correct answer is: ${getAnswerText(question, correctAnswers[question])}</p>
                        <p>${explanation}</p>
                    `;
                }
                
                feedbackElement.className = `feedback ${isCorrect ? 'success' : 'error'}`;
            }
        });
        
        // Special case for calendar items
        if (section === 'june' && userAnswers.june['calendar-items']) {
            const feedbackElement = document.getElementById('calendar-items-feedback');
            const selectedItems = userAnswers.june['calendar-items'];
            const allCorrectSelected = correctCalendarItems.every(item => selectedItems.includes(item));
            const noIncorrectSelected = selectedItems.every(item => correctCalendarItems.includes(item) || item === 'equipment');
            
            if (feedbackElement) {
                if (allCorrectSelected && noIncorrectSelected) {
                    feedbackElement.innerHTML = `
                        <p><strong>Correct!</strong> You selected all the important items to include in a compliance calendar.</p>
                        <p>${calendarItemExplanation}</p>
                    `;
                    feedbackElement.className = 'feedback success';
                } else {
                    feedbackElement.innerHTML = `
                        <p><strong>Incorrect.</strong> Your selection was not complete or included unnecessary items.</p>
                        <p>The compliance calendar should include: tax lodgment deadlines, superannuation payment due dates, insurance policy renewal dates, license and permit expiry dates, and employee review dates.</p>
                        <p>${calendarItemExplanation}</p>
                    `;
                    feedbackElement.className = 'feedback error';
                }
            }
        }
        
        // Disable submit button and update continue button
        const submitButton = document.getElementById(`submit-${section}`);
        const continueButton = document.getElementById(`${section}-continue`);
        
        if (submitButton) {
            submitButton.disabled = true;
        }
        
        if (continueButton) {
            continueButton.disabled = true; // Will be enabled when they check the acknowledgment box
        }
        
        // Scroll to score element
        scoreElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    
    // Helper function to get the text of an answer option
    function getAnswerText(name, value) {
        const option = document.querySelector(`input[name="${name}"][value="${value}"]`);
        if (option && option.parentNode) {
            return option.parentNode.textContent.trim();
        }
        return value;
    }
    
    // Add submit buttons to each section
    function addSubmitButtons() {
        const sections = ['document-review', 'january', 'february', 'march', 'april', 'may', 'june'];
        
        sections.forEach(section => {
            const continueButton = document.getElementById(`${section}-continue`);
            if (continueButton) {
                const submitButton = document.createElement('button');
                submitButton.id = `submit-${section}`;
                submitButton.className = 'secondary-button';
                submitButton.textContent = 'Submit Answers';
                submitButton.disabled = true;
                
                continueButton.parentNode.insertBefore(submitButton, continueButton);
                
                // Add event listener
                submitButton.addEventListener('click', function() {
                    // Confirm submission
                    if (confirm('Are you sure you want to submit your answers? You will not be able to change them after submission.')) {
                        submitSectionAnswers(section);
                    }
                });
            }
        });
    }
    
    // Continue buttons for each section
    document.getElementById('document-review-continue').addEventListener('click', function() {
        navigateToSection(3); // Navigate to January
    });
    
    document.getElementById('january-continue').addEventListener('click', function() {
        navigateToSection(4); // Navigate to February
    });
    
    document.getElementById('february-continue').addEventListener('click', function() {
        navigateToSection(5); // Navigate to March
    });
    
    document.getElementById('march-continue').addEventListener('click', function() {
        navigateToSection(6); // Navigate to April
    });
    
    document.getElementById('april-continue').addEventListener('click', function() {
        navigateToSection(7); // Navigate to May
    });
    
    document.getElementById('may-continue').addEventListener('click', function() {
        navigateToSection(8); // Navigate to June
    });
    
    document.getElementById('june-continue').addEventListener('click', function() {
        navigateToSection(9); // Navigate to Summary
    });
    
    // Generate Summary
    function generateSummary() {
        // Financial Summary
        const financialSummary = document.getElementById('financial-summary');
        financialSummary.innerHTML = '';
        
        // Add financial summary items
        addSummaryItem(financialSummary, 
            'Superannuation Contribution: Reviewed calculations and paid shortfall of $150', 
            userAnswers.march['super-shortfall'] === correctAnswers['super-shortfall'] ? 'success' : 'error');
        
        addSummaryItem(financialSummary, 
            'Employee Pay Rates: Updated to comply with new award rates', 
            userAnswers.may['pay-adjustment'] === correctAnswers['pay-adjustment'] && 
            userAnswers.may['adjustment-timing'] === correctAnswers['adjustment-timing'] ? 'success' : 'error');
        
        addSummaryItem(financialSummary, 
            'BAS Lodgment: Calculated $2,500 GST payable and lodged by April 28', 
            userAnswers.april['gst-calculation'] === correctAnswers['gst-calculation'] && 
            userAnswers.april['bas-deadline'] === correctAnswers['bas-deadline'] ? 'success' : 'error');
        
        addSummaryItem(financialSummary, 
            'Asset Management: Recorded new tractor as capital asset with depreciation', 
            userAnswers.march['purchase-documentation'] === correctAnswers['purchase-documentation'] ? 'success' : 'error');
        
        addSummaryItem(financialSummary, 
            'Record-Keeping: Implemented cloud-based document management system', 
            userAnswers.may['record-system'] === correctAnswers['record-system'] ? 'success' : 'error');
        
        // Legal Summary
        const legalSummary = document.getElementById('legal-summary');
        legalSummary.innerHTML = '';
        
        // Add legal summary items
        addSummaryItem(legalSummary, 
            'Business Structure: Converting partnership to company structure', 
            userAnswers.june['structure-decision'] === correctAnswers['structure-decision'] ? 'success' : 'error');
        
        addSummaryItem(legalSummary, 
            'License Renewals: Renewed Water Usage License and Food Safety Certification', 
            userAnswers.january['water-license'] === correctAnswers['water-license'] && 
            userAnswers.january['food-cert'] === correctAnswers['food-cert'] ? 'success' : 'error');
        
        addSummaryItem(legalSummary, 
            'Employee Compliance: Ensured all employees paid at or above award rates', 
            userAnswers.february['new-employee-rate'] === correctAnswers['new-employee-rate'] && 
            userAnswers.february['new-employee-action'] === correctAnswers['new-employee-action'] ? 'success' : 'error');
        
        addSummaryItem(legalSummary, 
            'Workplace Safety: Recorded incident and implemented preventive measures', 
            userAnswers.april['incident-action'] === correctAnswers['incident-action'] && 
            userAnswers.april['preventive-measures'] === correctAnswers['preventive-measures'] ? 'success' : 'error');
        
        addSummaryItem(legalSummary, 
            'Chemical Storage: Conducted self-audit to prepare for inspection', 
            userAnswers.march['chemical-inspection'] === correctAnswers['chemical-inspection'] ? 'success' : 'error');
        
        addSummaryItem(legalSummary, 
            'Compliance Calendar: Created quarterly review schedule for all obligations', 
            userAnswers.june['review-frequency'] === correctAnswers['review-frequency'] ? 'success' : 'error');
        
        // Insurance Summary
        const insuranceSummary = document.getElementById('insurance-summary');
        insuranceSummary.innerHTML = '';
        
        // Add insurance summary items
        addSummaryItem(insuranceSummary, 
            'Workers\' Compensation: Renewed policy and updated to include all employees', 
            userAnswers.january['workers-comp-action'] === correctAnswers['workers-comp-action'] ? 'success' : 'error');
        
        addSummaryItem(insuranceSummary, 
            'Public Liability: Renewed policy at increased premium', 
            userAnswers.february['liability-renewal'] === correctAnswers['liability-renewal'] ? 'success' : 'error');
        
        addSummaryItem(insuranceSummary, 
            'Property Insurance: Increased coverage to include new tractor and all buildings/equipment', 
            userAnswers.march['tractor-insurance'] === correctAnswers['tractor-insurance'] && 
            userAnswers.may['property-action'] === correctAnswers['property-action'] ? 'success' : 'error');
        
        addSummaryItem(insuranceSummary, 
            'Additional Coverage: Conducted risk assessment for crop and business interruption insurance', 
            userAnswers.april['missing-insurance'] === correctAnswers['missing-insurance'] && 
            userAnswers.april['insurance-priority'] === correctAnswers['insurance-priority'] ? 'success' : 'error');
        
        const existingSectionScores = document.querySelector('.section-scores-summary');
        if (existingSectionScores) {
            existingSectionScores.remove();
        } 
        
        // Section Scores Summary
        const sectionScoresSummary = document.createElement('div');
        sectionScoresSummary.className = 'section-scores-summary';
        sectionScoresSummary.innerHTML = '<h3>Section Scores</h3>';
        
        const scoreTable = document.createElement('table');
        scoreTable.className = 'scores-table';
        
        // Add table header
        let tableHeader = '<thead><tr><th>Section</th><th>Score</th></tr></thead>';
        
        // Add table body
        let tableBody = '<tbody>';
        for (const section in sectionScores) {
            const score = sectionScores[section];
            const sectionName = section.charAt(0).toUpperCase() + section.slice(1).replace('-', ' ');
            
            tableBody += `
                <tr>
                    <td>${sectionName}</td>
                    <td>${score}%</td>
                </tr>
            `;
        }
        tableBody += '</tbody>';
        
        scoreTable.innerHTML = tableHeader + tableBody;
        sectionScoresSummary.appendChild(scoreTable);
        
        // Insert section scores before final score
        const finalScore = document.querySelector('.final-score');
        finalScore.parentNode.insertBefore(sectionScoresSummary, finalScore);
        
        // Calculate final score
        calculateFinalScore();
    }
    
    function addSummaryItem(container, text, status) {
        const item = document.createElement('li');
        item.textContent = text;
        item.classList.add(status);
        container.appendChild(item);
    }
    
    function calculateFinalScore() {
        // Final score is already calculated as we go
        const finalPercentage = Math.round((totalCorrect / totalQuestions) * 100) || 0;
        
        // Update score display
        document.getElementById('score-percentage').textContent = `${finalPercentage}%`;
        document.getElementById('correct-answers').textContent = totalCorrect;
        document.getElementById('total-questions').textContent = totalQuestions;
        
        // Set score message
        const scoreMessage = document.getElementById('score-message');
        if (finalPercentage >= 90) {
            scoreMessage.textContent = 'Excellent! You have a strong understanding of legal and insurance compliance issues for agricultural businesses.';
        } else if (finalPercentage >= 70) {
            scoreMessage.textContent = 'Good job! You\'ve identified most of the compliance issues, but there\'s still room for improvement.';
        } else if (finalPercentage >= 50) {
            scoreMessage.textContent = 'You\'ve identified some key issues, but missed several important compliance concerns. Review the areas where you made errors.';
        } else {
            scoreMessage.textContent = 'You need to improve your understanding of legal and insurance compliance requirements for agricultural businesses.';
        }
    }
    
    // Allow progress steps to be clicked for navigation (for testing/review purposes)
    document.querySelectorAll('.step').forEach((step, index) => {
        step.addEventListener('click', function() {
            navigateToSection(index);
        });
    });
    
    // Initialize the simulation
    updateProgressBar();
    setupAllRadioHandlers();
    addSubmitButtons();
    
    // For debugging - enable all continue buttons
    if (window.location.search.includes('debug=true')) {
        document.querySelectorAll('.primary-button').forEach(button => {
            button.disabled = false;
        });
    }
});