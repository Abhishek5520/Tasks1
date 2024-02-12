const menuItems = 
[
    {
        component: "NavTitle",
        name: "INSTITUTE"
    },
    {
        component: "NavItem",
        name: "Home",
        to: "home",
        badge: {
            color: "info",
            text: "NEW"
        },
        permissionId: 8
    },
    {
        component: "NavItem",
        name: "My Institutions",
        to: "my-institutions",
        permissionId: 3
    },
    {
        component: "NavItem",
        name: "My Classes",
        to: "my-classes",
        badge: {
            color: "info",
            text: "NEW"
        },
        permissionId: 6
    },
    {
        component: "NavGroup",
        name: "Analytics",
        to: "analytics",
        permissionId: 2,
        items: [
            {
                component: "NavItem",
                name: "Institute Overview",
                to: "analytics/data-overview",
                permissionId: 2
            }
        ]
    },
    {
        component: "NavItem",
        name: "Knowledge Meter",
        to: "knowledge-meter",
        badge: {
            color: "info",
            text: "NEW"
        },
        permissionId: 2
    },
    {
        component: "NavGroup",
        name: "Micro Learning",
        to: "micro-learning",
        permissionId: 4,
        items: [
            {
                component: "NavItem",
                name: "Management",
                to: "micro-learning/management",
                permissionId: 8
            },
            {
                component: "NavItem",
                name: "Student View",
                to: "micro-learning/studentview",
                permissionId: 4
            }
        ]
    },
    {
        component: "NavGroup",
        name: "My Tests",
        to: "tests",
        permissionId: 4,
        items: [
            {
                component: "NavItem",
                name: "Scheduled Tests",
                to: "tests/scheduled-tests",
                permissionId: 6
            },
            {
                component: "NavItem",
                name: "Tests Repository",
                to: "tests/test-repository",
                permissionId: 6
            },
            {
                component: "NavItem",
                name: "Reports",
                to: "tests/reports",
                permissionId: 6
            }
        ]
    },
    {
        component: "NavTitle",
        name: "RESOURCE LINKS"
    },
    {
        component: "NavItem",
        name: "Assets",
        to: "assets",
        permissionId: 5
    },
    {
        component: "NavItem",
        name: "Teacher Resources",
        to: "teacher-resources",
        permissionId: 2
    },
    {
        component: "NavGroup",
        name: "Videos",
        to: "videos",
        permissionId: 2,
        items: [
            {
                component: "NavItem",
                name: "Concept Videos",
                to: "videos/concept-videos",
                permissionId: 3
            }
        ]
    },
    {
        component: "NavGroup",
        name: "Question Bank",
        to: "questionbank",
        permissionId: 4,
        items: [
            {
                component: "NavItem",
                name: "Publisher Questions",
                to: "questionbank/pub-questions",
                permissionId: 5
            },
            {
                component: "NavItem",
                name: "My Questions",
                to: "questionbank/my-questions",
                permissionId: 8
            },
            {
                component: "NavItem",
                name: "My Institution Questions",
                to: "questionbank/institute-questions",
                permissionId: 4
            }
        ]
    },
    {
        component: "NavItem",
        name: "Chapters & Topics",
        to: "chapter-topics",
        permissionId: 3
    },
    {
        component: "NavGroup",
        name: "Teacher Training",
        to: "teacher-training",
        permissionId: 8,
        items: [
            {
                component: "NavItem",
                name: "Live Classes",
                to: "teacher-training/live-classes",
                permissionId: 4
            },
            {
                component: "NavItem",
                name: "Training Materials",
                to: "teacher-training/training-material",
                permissionId: 5
            }
        ]
    },
    {
        component: "NavItem",
        name: "Attendance",
        to: "attendance",
        permissionId: 5
    },
    {
        component: "NavTitle",
        name: "ADMIN"
    },
    {
        component: "NavItem",
        name: "Administration",
        to: "administration",
        permissionId: 5
    }
]



// Task 1. Find objects in the given array that either have a permissionId in [3, 4] or whose child 'items' have a permissionId in [5, 8]. 
// If none of object's child 'items' have necessary permissionIds, the said object should also be excluded from the final outcome even if it itself has a required permissionId.

const updatedMenuItems = menuItems.filter(item => { 
    if (item.permissionId === 3 || item.permissionId === 4) {
        return true;
    } else if (item.items) {
        return item.items.some(child => child.permissionId === 5 || child.permissionId === 6 || child.permissionId === 7 || child.permissionId === 8);
    }
    return false;
})

// console.log(updatedMenuItems);


// Task 2. Using the resulting array from above, create a mechanism to:
// i). Get and remove the first element.
// ii). Create a request to send it to an api end-point (https://pmponline.co.in/sdetest/requests.php).
// iii). Once the request in step (ii) is complete(succeeds or fails), repeat step (i) and (ii) until the array is empty. 

async function postData(url = "", data = {},updatedMenuItems){
    const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(data)
    });
    console.log(response.status)
    if(response.status === 200){
        updatedMenuItems.shift();
        console.log(updatedMenuItems.length)
        if(updatedMenuItems.length > 0){
            postData(url,updatedMenuItems[0],updatedMenuItems)
        }
    }

}

postData("https://pmponline.co.in/sdetest/requests.php",updatedMenuItems[0],updatedMenuItems)