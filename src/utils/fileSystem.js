/**
 * Given a path like "src/components/App.jsx" and a FileSystemTree,
 * returns the node for that path, or null if not found.
 */
export const getNodeAtPath = (tree, path) => {
  if (!path) return null;
  const parts = path.split('/');
  let current = tree;
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    const node = current[part];
    if (!node) return null;
    if (i === parts.length - 1) return node; // found the exact node
    if (!node.directory) return null; // path expects directory but found file
    current = node.directory;
  }
  return null;
}

/**
 * Gets the string contents of a file.
 */
export const getFileContents = (tree, path) => {
  const node = getNodeAtPath(tree, path);
  if (node && node.file && node.file.contents !== undefined) {
    return node.file.contents;
  }
  return '';
}

/**
 * Creates or updates a file at a specific path, recursively creating directories if needed.
 * Returns a deep copy of the modified tree.
 */
export const setFileContents = (tree, path, contents) => {
  const newTree = JSON.parse(JSON.stringify(tree || {})); // deep clone
  const parts = path.split('/');
  let current = newTree;
  
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    if (i === parts.length - 1) {
      current[part] = { file: { contents } };
    } else {
      if (!current[part]) {
        current[part] = { directory: {} };
      } else if (!current[part].directory) {
        // Handle edge case where a file exists with the same name as a requested directory
        current[part] = { directory: {} }; 
      }
      current = current[part].directory;
    }
  }
  return newTree;
}

/**
 * Deletes a file or directory at the specified path.
 */
export const deleteNode = (tree, path) => {
  if (!path) return tree;
  const newTree = JSON.parse(JSON.stringify(tree || {}));
  const parts = path.split('/');
  let current = newTree;
  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i];
    if (!current[part] || !current[part].directory) return newTree;
    current = current[part].directory;
  }
  delete current[parts[parts.length - 1]];
  return newTree;
}

/**
 * Renames a node at a given path.
 * oldPath: e.g. "src/App.jsx"
 * newName: e.g. "Main.jsx" (just the name, not the full path)
 */
export const renameNode = (tree, oldPath, newName) => {
  if (!oldPath || !newName) return tree;
  const newTree = JSON.parse(JSON.stringify(tree || {}));
  const parts = oldPath.split('/');
  let current = newTree;
  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i];
    if (!current[part] || !current[part].directory) return newTree;
    current = current[part].directory;
  }
  
  const oldName = parts[parts.length - 1];
  if (current[oldName]) {
    current[newName] = current[oldName];
    delete current[oldName];
  }
  
  return newTree;
}

/**
 * Converts a nested FileSystemTree into a flat array of nodes with full paths for rendering.
 */
export const flattenTreeForRendering = (tree, prefix = '') => {
  let result = [];
  if (!tree) return result;
  
  Object.keys(tree).sort().forEach(key => {
    const node = tree[key];
    const fullPath = prefix ? `${prefix}/${key}` : key;
    const isFolder = !!node.directory;
    
    result.push({
      name: key,
      path: fullPath,
      isFolder,
      children: isFolder ? flattenTreeForRendering(node.directory, fullPath) : []
    });
  });
  
  return result;
}
