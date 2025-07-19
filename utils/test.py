import numpy as np

def normalize(v):
    norm = np.linalg.norm(v)
    if norm < 1e-10:
        return v
    return v / norm

def project_obb_on_axis(position, axes, extent, axis):
    center_proj = np.dot(position, axis)
    radius = 0
    for i in range(len(axes)):
        radius += abs(np.dot(axes[i], axis)) * extent[i]
    return center_proj - radius, center_proj + radius

def overlap_intervals(min1, max1, min2, max2):
    return not (max1 < min2 or max2 < min1)

def sat_obb_vs_obb(obj1, obj2):
    axes1 = [normalize(ax) for ax in obj1['rotation']]
    axes2 = [normalize(ax) for ax in obj2['rotation']]
    
    axes_to_test = axes1 + axes2

    min_overlap = float('inf')
    min_axis = None
    
    for axis in axes_to_test:
        min1, max1 = project_obb_on_axis(obj1['position'], axes1, obj1['extent'], axis)
        min2, max2 = project_obb_on_axis(obj2['position'], axes2, obj2['extent'], axis)
        if not overlap_intervals(min1, max1, min2, max2):
            return False, None, None  # No collision
        
        # Calcular overlap
        overlap = min(max1, max2) - max(min1, min2)
        if overlap < min_overlap:
            min_overlap = overlap
            min_axis = axis

        
    center_vector = obj2['position'] - obj1['position']
    if np.dot(center_vector, min_axis) < 0:
        min_axis = -min_axis

    if min_axis is not None:
        min_axis = normalize(min_axis)

    return True, min_overlap, min_axis


# 1D examples
obj1_1d = {
    'position': np.array([0]),
    'rotation': [np.array([1])],
    'extent': np.array([1])
}
obj2_1d_collision = {
    'position': np.array([0.5]),
    'rotation': [np.array([1])],
    'extent': np.array([1])
}
obj2_1d_no_collision = {
    'position': np.array([3]),
    'rotation': [np.array([1])],
    'extent': np.array([0.5])
}

print("Collision 1D? (should be True):", sat_obb_vs_obb(obj1_1d, obj2_1d_collision))
print("Collision 1D? (should be False):", sat_obb_vs_obb(obj1_1d, obj2_1d_no_collision))


# 2D examples (from your earlier data)
obj1_2d = {
    'position': np.array([0, 0]),
    'rotation': [np.array([1, 0]), np.array([0, 1])],
    'extent': np.array([1, 2])
}
obj2_2d_collision = {
    'position': np.array([1, 1]),
    'rotation': [np.array([0, 1]), np.array([-1, 0])],
    'extent': np.array([1, 2])
}
obj2_2d_no_collision = {
    'position': np.array([5, 0]),
    'rotation': [np.array([0, 1]), np.array([-1, 0])],
    'extent': np.array([1, 2])
}

print("Collision 2D? (should be True):", sat_obb_vs_obb(obj1_2d, obj2_2d_collision))
print("Collision 2D? (should be False):", sat_obb_vs_obb(obj1_2d, obj2_2d_no_collision))


# 3D examples (from your earlier data)
obj1_3d = {
    'position': np.array([0, 0, 0]),
    'rotation': [
        np.array([1, 0, 0]),
        np.array([0, 1, 0]),
        np.array([0, 0, 1])
    ],
    'extent': np.array([1, 2, 3])
}
obj2_3d_collision = {
    'position': np.array([1, 1, 1]),
    'rotation': [
        np.array([0, 1, 0]),
        np.array([-1, 0, 0]),
        np.array([0, 0, 1])
    ],
    'extent': np.array([1, 1, 1])
}
obj2_3d_no_collision = {
    'position': np.array([10, 0, 0]),
    'rotation': [
        np.array([0, 1, 0]),
        np.array([-1, 0, 0]),
        np.array([0, 0, 1])
    ],
    'extent': np.array([1, 1, 1])
}

print("Collision 3D? (should be True):", sat_obb_vs_obb(obj1_3d, obj2_3d_collision))
print("Collision 3D? (should be False):", sat_obb_vs_obb(obj1_3d, obj2_3d_no_collision))


# 4D examples (from your earlier data)
obj1_4d = {
    'position': np.array([0, 0, 0, 0]),
    'rotation': [
        np.array([1, 0, 0, 0]),
        np.array([0, 1, 0, 0]),
        np.array([0, 0, 1, 0]),
        np.array([0, 0, 0, 1])
    ],
    'extent': np.array([1, 2, 3, 1])
}
obj2_4d_collision = {
    'position': np.array([1, 1, 1, 0.5]),
    'rotation': [
        np.array([0, 1, 0, 0]),
        np.array([-1, 0, 0, 0]),
        np.array([0, 0, 1, 0]),
        np.array([0, 0, 0, 1])
    ],
    'extent': np.array([1, 1, 1, 0.5])
}
obj2_4d_no_collision = {
    'position': np.array([10, 0, 0, 0]),
    'rotation': [
        np.array([0, 1, 0, 0]),
        np.array([-1, 0, 0, 0]),
        np.array([0, 0, 1, 0]),
        np.array([0, 0, 0, 1])
    ],
    'extent': np.array([1, 1, 1, 0.5])
}

print("Collision 4D? (should be True):", sat_obb_vs_obb(obj1_4d, obj2_4d_collision))
print("Collision 4D? (should be False):", sat_obb_vs_obb(obj1_4d, obj2_4d_no_collision))


# 5D examples
obj1_5d = {
    'position': np.array([0, 0, 0, 0, 0]),
    'rotation': [
        np.array([1, 0, 0, 0, 0]),
        np.array([0, 1, 0, 0, 0]),
        np.array([0, 0, 1, 0, 0]),
        np.array([0, 0, 0, 1, 0]),
        np.array([0, 0, 0, 0, 1])
    ],
    'extent': np.array([1, 2, 3, 1, 0.5])
}
obj2_5d_collision = {
    'position': np.array([1, 1, 1, 0.5, 0]),
    'rotation': [
        np.array([0, 1, 0, 0, 0]),
        np.array([-1, 0, 0, 0, 0]),
        np.array([0, 0, 1, 0, 0]),
        np.array([0, 0, 0, 1, 0]),
        np.array([0, 0, 0, 0, 1])
    ],
    'extent': np.array([1, 1, 1, 0.5, 0.3])
}
obj2_5d_no_collision = {
    'position': np.array([10, 0, 0, 0, 0]),
    'rotation': [
        np.array([0, 1, 0, 0, 0]),
        np.array([-1, 0, 0, 0, 0]),
        np.array([0, 0, 1, 0, 0]),
        np.array([0, 0, 0, 1, 0]),
        np.array([0, 0, 0, 0, 1])
    ],
    'extent': np.array([1, 1, 1, 0.5, 0.3])
}

print("Collision 5D? (should be True):", sat_obb_vs_obb(obj1_5d, obj2_5d_collision))
print("Collision 5D? (should be False):", sat_obb_vs_obb(obj1_5d, obj2_5d_no_collision))

