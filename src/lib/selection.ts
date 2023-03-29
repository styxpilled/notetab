export const CaretUtil = {
  insertTextAtCaret(nodeName: string, text?: string) {
    let range: Range;
    const sel = window.getSelection();
    if (sel.getRangeAt && sel.rangeCount) {
      range = sel.getRangeAt(0);
      range.deleteContents();
      if (nodeName !== '') {
        console.log(nodeName);

        range.insertNode(document.createElement(nodeName));
      }
      if (text) {
        console.log(text);

        range.insertNode(document.createTextNode(text));
      }
    }
  },
  setCaretPosition(container: HTMLElement, position: number) {
    if (position >= 0) {
      const selection = window.getSelection();
      const range = CaretUtil.createRange(container, { count: position });
      if (range) {
        range.collapse(false);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  },
  getCaretPosition(container: HTMLElement) {
    const selection = window.getSelection();
    let charCount = -1;
    let node: Node;
    if (selection.focusNode) {
      if (CaretUtil.isDescendantOf(selection.focusNode, container)) {
        node = selection.focusNode;
        charCount = selection.focusOffset;
        while (node) {
          if (node == container) {
            break;
          }
          if (node.previousSibling) {
            node = node.previousSibling;
            charCount += node.textContent.length;
          } else {
            node = node.parentNode;
          }
        }
      }
    }
    return charCount;
  },
  isDescendantOf(node: Node, parent: Node) {
    while (node) {
      if (node == parent) {
        return true;
      }
      node = node.parentNode;
    }
    return false;
  },
  createRange(node: Node, chars, range?: Range): Range {
    if (!range) {
      range = window.document.createRange();
      range.selectNode(node);
      range.setStart(node, 0);
    }
    if (chars.count == 0) {
      range.setEnd(node, chars.count);
    } else if (node && chars.count > 0) {
      if (node.nodeType == 3) {
        if (node.textContent.length < chars.count) {
          chars.count -= node.textContent.length;
        } else {
          range.setEnd(node, chars.count);
          chars.count = 0;
        }
      } else {
        let _g = 0;
        const _g1 = node.childNodes.length;
        while (_g < _g1) {
          const lp = _g++;
          range = CaretUtil.createRange(node.childNodes[lp], chars, range);
          if (chars.count == 0) {
            break;
          }
        }
      }
    }
    return range;
  }
};
