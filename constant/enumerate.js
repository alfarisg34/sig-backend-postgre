// role enumerate
exports.ROLE = ['SUPER', 'ADMIN', 'FA', 'LEADER']

// quotation status
/**
 * 1. WAITING
 * 2. APPROVE_LEADER
 * 3. APPROVE_CLIENT
 * 4. REJECTED
 * 5. FINAL_APPROVE
 * 6. TEMPORARY_APPROVE
 * 7. REVISE
 * 8. STOPPED
 * 9. REVISED
 * 10. REVISED_TEMPORARY
 */
exports.QUOTATIONSTATUS = [
    'WAITING', // waiting for approve
    'APPROVE_LEADER', // approved by leader
    'APPROVE_CLIENT', // approved by client
    'REJECTED', // rejected by client
    'FINAL_APPROVE', // final approve
    'TEMPORARY_APPROVE', // temporary approve
    'REVISE', // revise
    'STOPPED', // stopped
    'REVISED', // revised
    'REVISED_TEMPORARY' // revised after temporary approve
]
