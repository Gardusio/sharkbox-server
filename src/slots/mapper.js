/** 
 * SLOT MAPPER 
 * 
*/

export const toSlots = (courseDTO, courseId) => {
    const slotsDTO = courseDTO.slots;
    const slots = []

    for (const [day, daySlots] of Object.entries(slotsDTO)) {
        for (const timeSlot of daySlots) {
            const { start, end } = timeSlot;
            let entity = {
                corso: courseId,
                start: start,
                end: end,
                dow: day
            }

            if (timeSlot.id) {
                entity = {
                    _id: timeSlot.id,
                    ...entity,
                }
            }

            slots.push(entity);
        }
    }
    return slots;
}


export const toSlot = (slotDTO) => {
    const { id, course_id, start, end } = slotDTO;

    return {
        _id: id,
        corso: course_id,
        start,
        end
    }
}

export const toSlotsResponse = (slots) => {

    if (slots.length <= 0) return {}

    const groupedSlots = slots.reduce((acc, slot) => {
        const { _id, corso, start, end, dow } = slot;

        // Create an object representing the slot without unnecessary properties
        const slotData = { id: _id, course_id: corso, start, end };

        // Check if the dow key already exists in the accumulator
        if (!acc[dow]) {
            // If not, create a new array with the slotData
            acc[dow] = [slotData];
        } else {
            // If yes, push the slotData to the existing array
            acc[dow].push(slotData);
        }

        return acc;
    }, {});

    return groupedSlots
}
